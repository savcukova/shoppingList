# Shopping List App

Aplikace pro správu nákupních seznamů s možností sdílení mezi uživateli.

## Konfigurace - Mock data vs. skutečný server

Aplikace podporuje dva režimy provozu:

### 1. Režim s mock daty (pro vývoj bez serveru)

Pro použití mock dat vytvořte soubor `.env` v kořenovém adresáři `client/` s následujícím obsahem:

```env
VITE_USE_MOCK_DATA=true
```

V tomto režimu aplikace používá lokální mock data místo skutečných serverových volání. Všechny operace jsou simulovány lokálně s malým zpožděním (300ms) pro simulaci síťové komunikace.

### 2. Režim se skutečným serverem

Pro použití skutečného serveru vytvořte soubor `.env` v kořenovém adresáři `client/` s následujícím obsahem:

```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:3001
```

Nebo jednoduše nechte `VITE_USE_MOCK_DATA` prázdné nebo nastavte na `false`.

**Poznámka:** Po změně `.env` souboru je nutné restartovat vývojový server (`npm run dev`).

## Přihlášení

Aplikace má několik testovacích účtů pro přihlášení:

### Owner účet (Vlastník seznamu)

- **Email:** `owner@example.com`
- **Password:** `password`

**Práva Owner:**

- ✅ Editovat název seznamu
- ✅ Smazat/archivovat seznam
- ✅ Smazat itemy
- ✅ Přidávat členy do seznamu
- ✅ Odebírat členy ze seznamu
- ✅ Přidávat itemy
- ✅ Checknout/odchecknout itemy
- ✅ Zobrazit seznam

### Member účty (Členové seznamu)

**Účet 1:**

- **Email:** `member@example.com`
- **Password:** `password`

**Účet 2:**

- **Email:** `petr.svoboda@example.com`
- **Password:** `password`

**Účet 3:**

- **Email:** `marie.dvorakova@example.com`
- **Password:** `password`

**Práva Member:**

- ✅ Přidávat itemy
- ✅ Checknout/odchecknout itemy
- ✅ Zobrazit seznam
- ✅ Odejít ze seznamu (smazat sebe)
- ✅ Smazat itemy
- ❌ Editovat název seznamu
- ❌ Smazat/archivovat seznam
- ❌ Přidávat/odebírat jiné členy

## Jak se přihlásit

1. Otevři aplikaci v prohlížeči
2. Zadej email a password do přihlašovacího formuláře
3. Klikni na tlačítko "Login"
4. Po úspěšném přihlášení budeš přesměrován na první seznam

## Testování

Pro detailní návod na testování implementace serverových volání a mock dat, viz [TESTING.md](./TESTING.md)
