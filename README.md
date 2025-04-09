# Hephaistos Frontend

## Fájl Dokumentáció

### App.jsx

Az `App.jsx` az alkalmazás fő komponense, amely belépési pontként szolgál:

- **Struktúra**: Beágyazott komponens megközelítést használ `App` és `AppContent` komponensekkel
- **Útvonalak**: React Router-t implementál útvonalakkal a Kezdőlap, Órarend, Bejelentkezés, Regisztráció stb. számára
- **Téma kezelés**: Integrálja a Material UI ThemeProvider-t egyedi világos/sötét móddal
- **Hitelesítés**: Az alkalmazást AuthProvider-rel csomagolja a felhasználói hitelesítéshez
- **Reszponzív dizájn**: Media Query-ket használ a felhasználói felület mobileszközökhöz való adaptálásához
- **Értesítési rendszer**: Tartalmaz egy újrafelhasználható Notification komponenst

Fő jellemzők:
- Sötét/világos mód kapcsoló egyedi hook-kal és tartós tárolással
- Reszponzív elrendezés érzékelés
- Védett útvonalak hitelesítési állapot alapján

### theme.jsx

A `theme.jsx` fájl tartalmazza az alkalmazás téma konfigurációját:

- **Szín meghatározások**: Központi színpaletta a konzisztencia érdekében
- **Világos téma**: Konfiguráció világos módhoz, beleértve színeket, komponens stílusokat
- **Sötét téma**: Konfiguráció sötét módhoz megfelelő kontraszttal
- **Téma generálás**: Exportál egy függvényt, amely a megfelelő témát generálja az üzemmód alapján

A fájl a Material UI témázási rendszerét használja konzisztens stílusok létrehozásához az egész alkalmazásban:
- Egyedi színpaletták mind a világos, mind a sötét módokhoz
- Komponens stílus felülírások (különösen űrlapelemekhez)
- Tipográfiai beállítások

### AuthContext.jsx

Az `AuthContext.jsx` fájl az alkalmazás hitelesítési rendszerét kezeli:

- **Context API**: React Context API-t használ a hitelesítési állapot globális kezelésére
- **Állapotkezelés**: useReducer hook segítségével kezeli a bejelentkezési állapotot
- **Token kezelés**: JWT tokenek tárolása és kezelése localStorage-ban
- **API integráció**: Axios használata a backend authentikációs végpontokkal való kommunikációhoz

Fő funkciók:
- Bejelentkezési logika (login)
- Kijelentkezési logika (logout)
- Egyszeri jelszó (OTP) kezelés jelszó-visszaállításhoz
- Teljesített tantárgyak frissítése
- Hitelesítési állapot automatikus visszatöltése lapfrissítéskor

## Hooks Mappa Dokumentáció

A `hooks` mappa egyedi React hookokat tartalmaz, amelyek újrafelhasználható logikát biztosítanak az alkalmazásban:

### useDarkMode.jsx

A témamód kezelésére szolgáló egyedi hook:
- Kezeli a világos/sötét téma állapotát
- Tárolja a felhasználó téma-preferenciáját a localStorage-ban
- Automatikusan visszatölti a preferált témát az alkalmazás újraindításakor
- Biztosítja a téma módosítási lehetőséget (toggle funkció)
- Megakadályozza a témaváltáskor előforduló villódzást (flicker)

### useMediaQuery.jsx

Képernyőméret érzékelő egyedi hook:
- Reszponzív dizájnt tesz lehetővé
- Figyeli a média lekérdezés változásait (pl. mobil/asztali mód)
- Automatikusan frissíti a komponenseket képernyőméret változáskor

### useForm.jsx

Űrlap kezelő egyedi hook:
- Egyszerűsíti az űrlapok állapotának kezelését
- Beviteli mezők validálása
- Hibakezelés és hibaüzenetek
- Űrlap adatok beküldési logika

### useLocalStorage.jsx

Helyi tárolás kezelő hook:
- Egyszerűsített interfészt biztosít a localStorage használatához
- Automatikus adatszerializálás és deszerializálás JSON formátumban
- Hibakezelés a localStorage műveletekhez
- Alapértelmezett értékek támogatása

## Pages Mappa Dokumentáció

A `pages` mappa tartalmazza az alkalmazás fő oldalait reprezentáló komponenseket:

### Home.jsx

A kezdőlap komponens:
- Üdvözlő felületet biztosít a felhasználók számára
- Megjeleníti az alkalmazás fő funkcióit és navigációs lehetőségeit
- Reszponzív dizájn különböző eszközökhöz
- Különböző tartalmakat jelenít meg a bejelentkezett és be nem jelentkezett felhasználóknak

### Schedule.jsx

Az órarend kezelő komponens:
- Megjeleníti a felhasználó órarendjét
- Lehetőséget biztosít tantárgyak felvételére és leadására
- Szűrési és rendezési funkciókat tartalmaz
- Szemeszter választási lehetőséget biztosít

### Login.jsx

Bejelentkezési komponens:
- Felhasználónév/email és jelszó beviteli mezőket tartalmaz
- Hibakezelés és validáció
- "Elfelejtett jelszó" funkció elérése
- Regisztrációs oldalra navigálási lehetőség

### Register.jsx

Regisztrációs komponens:
- Új felhasználói fiókok létrehozásához szükséges űrlapot tartalmaz
- Adatvalidáció és hibakezelés
- Sikeres regisztráció után automatikus átirányítás

### ForgotPassword.jsx

Jelszó-visszaállítási komponens:
- Email megadásához szükséges űrlap
- OTP (egyszeri jelszó) kezelés a jelszó visszaállításához
- Új jelszó beállításának lehetősége
- Visszajelzés a folyamat különböző lépéseiben

### ProfilePage.jsx

Felhasználói profil komponens:
- Felhasználói adatok megjelenítése
- Profil szerkesztési lehetőségek
- Teljesített tantárgyak kezelése
- Jelszó módosítási funkció

### ErrorPage.jsx

Hibaoldal komponens:
- 404-es és egyéb hibák kezelése
- Felhasználóbarát hibaüzenetek
- Navigációs lehetőség a kezdőlapra
- Támogató kapcsolattartási információk

## React Hook-ok

A React Hook-ok olyan függvények, amelyek lehetővé teszik funkcionális komponensek számára az állapot és más React funkciók használatát osztálykomponens írása nélkül. Néhány kulcsfontosságú hook ebben a projektben:

- **useState**: Állapotot kezel komponenseken belül (pl. értesítési állapot az App.jsx-ben)
- **useEffect**: Mellékhatásokat kezel, mint adatlekérés vagy feliratkozások
- **useContext**: Hozzáfér a kontextus adatokhoz, mint a hitelesítés a komponens fában
- **Egyedi Hook-ok**: Az alkalmazás egyedi hook-okat használ, mint a `useDarkMode` az újrafelhasználható logika beágyazásához

Az egyedi hook-ok lehetővé teszik a komponenslogika kinyerését újrafelhasználható függvényekbe. Például a `useDarkMode` hook kezeli a téma preferenciát és tárolja a localStorage-ban a munkamenetek közötti perzisztencia érdekében.

A hook-ok szabályokat követnek:
- Csak a legfelsőbb szinten hívjuk meg a hook-okat (nem ciklusokban vagy feltételeken belül)
- Csak React funkciókomponensekből vagy egyedi hook-okból hívjuk meg a hook-okat
