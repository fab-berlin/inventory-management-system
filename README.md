# Inventory Management System

Inventarverwaltung für Ferienhaus Wustrow. Zeigt Räume und deren Artikel mit Bestand und Bemerkungen.

Gebaut mit Next.js, deployed auf Vercel, Datenbank bei Neon (Serverless Postgres).

## Stack

- **Frontend/Backend:** Next.js (TypeScript)
- **Hosting:** Vercel (automatisches Deployment via GitHub Push)
- **Datenbank:** Neon Serverless Postgres (verbunden über Vercel Storage Integration)

## Datenstruktur

Die gesamte Inventardatei wird als einzelnes JSONB-Dokument in der Datenbank gespeichert. `place` ist der Schlüssel (z.B. `"Wustrow"`) und repräsentiert eine komplette Inventardatei.

```json
{
  "place": "Wustrow",
  "updated": "2026-06-25",
  "locations": [
    {
      "name": "HWR",
      "inventory": [
        {
          "id": "823746",
          "name": "Kaffee",
          "quantity": 2,
          "remarks": ""
        }
      ]
    }
  ]
}
```

Mehrere Objekte (z.B. ein zweites Ferienhaus) = weitere Zeilen in der DB mit anderem `place`-Wert.

## Datenbankschema

```sql
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  place TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE inventory ADD CONSTRAINT inventory_place_unique UNIQUE (place);
```

## API Routes

### `GET /api/inventory/read?place=Wustrow`
Liest den kompletten Inventardatensatz für den angegebenen Ort.

### `POST /api/inventory/update`
Schreibt den kompletten Inventardatensatz zurück (Last-Write-Wins).

```json
{ "data": { "place": "Wustrow", ... } }
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Umgebungsvariablen lokal einrichten:

```bash
npx vercel link
npx vercel env pull .env.local
```

Falls `env pull` die DB-Variable nicht zieht, `DATABASE_URL` manuell aus dem Neon-Dashboard in `.env.local` eintragen.

`.env.local` benötigt:
```
DATABASE_URL=postgres://...
```

## Deployment

Automatisch via GitHub — jeder Push auf `main` triggert ein neues Deployment auf Vercel. `DATABASE_URL` ist in Vercel bereits als Umgebungsvariable gesetzt.

## Bekannte Einschränkungen

- **Kein Conflict-Handling:** Wenn zwei Personen gleichzeitig speichern, gewinnt der letzte Speichervorgang. Für den Anwendungsfall (kleine Gruppe) akzeptabel, kann später mit einem `updated_at`-Check abgesichert werden.

## Route definition

### Root route — view only
- Zeigt alle Räume/Locations
- Pro Raum wird nur die Anzahl der Artikel angezeigt

### Room detail route — view only
- Zeigt alle Artikel eines Raums
- Raum-ID als Slug in der Route

### Inventory item detail route — view & edit
- Zeigt alle Details eines Artikels
- Bearbeitung möglich