# Shopping List App

Aplikace pro správu nákupních seznamů s možností sdílení mezi uživateli.

## Přihlášení

Aplikace má dva testovací účty pro přihlášení:

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

### Member účet (Člen seznamu)

- **Email:** `member@example.com`
- **Password:** `password`

**Práva Member:**

- ✅ Přidávat itemy
- ✅ Checknout/odchecknout itemy
- ✅ Zobrazit seznam
- ✅ Odejít ze seznamu (smazat sebe)
- ❌ Editovat název seznamu
- ❌ Smazat/archivovat seznam
- ❌ Smazat itemy
- ❌ Přidávat/odebírat jiné členy

## Jak se přihlásit

1. Otevři aplikaci v prohlížeči
2. Zadej email a password do přihlašovacího formuláře
3. Klikni na tlačítko "Login"
4. Po úspěšném přihlášení budeš přesměrován na první seznam

## Testování různých rolí

### Testování jako Owner:

1. Přihlas se jako `owner@example.com`
2. Měl bys vidět všechny funkce včetně tlačítek pro editaci, smazání a archivaci
3. Můžeš přidávat členy přes "Manage other users" v Edit list formuláři

### Testování jako Member:

1. Přihlas se jako `member@example.com`
2. Měl bys vidět jen základní funkce - přidávání itemů, checkování
3. Neměl bys vidět tlačítka pro editaci, smazání nebo archivaci seznamu
4. V MembersPage můžeš smazat jen sebe, ne ostatní členy

## Logout

Pro odhlášení klikni na tlačítko logout. Po odhlášení budeš přesměrován zpět na přihlašovací stránku.
