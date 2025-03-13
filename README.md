# Smart Grid & Air Quality Dashboard - Instrukcja obsługi

## Spis treści
1. [Uruchomienie projektu](#uruchomienie-projektu)
2. [Główne funkcjonalności](#główne-funkcjonalności)
3. [Panel monitorowania jakości powietrza](#panel-monitorowania-jakości-powietrza)
4. [Asystent AI i przetwarzanie dokumentów](#asystent-ai-i-przetwarzanie-dokumentów)
5. [Mapy jakości powietrza w województwie pomorskim](#mapy-jakości-powietrza-w-województwie-pomorskim)
6. [Rozwiązywanie problemów](#rozwiązywanie-problemów)

## Uruchomienie projektu

### Wymagania wstępne
- Node.js (zalecana wersja 16 lub nowsza)
- npm (menedżer pakietów Node.js)
- Klucz API Google Gemini (dla funkcji asystenta AI)

### Instalacja
1. Sklonuj repozytorium:
   ```bash
   git clone <URL_REPOZYTORIUM>
   cd smart-grid-gems
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Skonfiguruj klucz API Gemini:
   Możesz to zrobić na dwa sposoby:
   - Kliknij ikonę kluczy w lewym górnym rogu interfejsu i wprowadź swój klucz API
   - Utwórz plik `.env` w głównym katalogu projektu i dodaj linię:
     ```
     VITE_GOOGLE_API_KEY=TWÓJ_KLUCZ_API
     ```

4. Uruchom projekt w trybie deweloperskim:
   ```bash
   npm run dev
   ```

5. Otwórz przeglądarkę i przejdź do adresu: `http://localhost:5173/`

## Główne funkcjonalności

### Nawigacja po systemie
- **Strona główna** - zawiera dashboard ze wskaźnikami zużycia energii i jakości powietrza
- **Zakładki nawigacyjne** - używaj zakładek na górze ekranu do przełączania między różnymi widokami:
  - **Przestrzenie** - główny dashboard z danymi
  - **Mapy jakości powietrza** - interaktywne mapy z danymi Airly
  - **Analiza** - szczegółowa analiza danych
  - **Status** - status urządzeń IoT
  - **Czujniki** - informacje z czujników
  - **Integracje** - opcje integracji z innymi systemami

### Personalizacja interfejsu
- **Tryb ciemny/jasny** - przełącznik w prawym górnym rogu
- **Zmiana języka** - wybór języka w prawym górnym rogu (polski, angielski, niemiecki, ukraiński, rosyjski)
- **Samouczek** - kliknij przycisk "Pokaż samouczek" w prawym dolnym rogu

### Eksport danych
- W zakładce "Przestrzenie" możesz eksportować widok do plików JPG lub PDF za pomocą przycisków na górze sekcji

## Panel monitorowania jakości powietrza

Panel główny zawiera:
- **Statystyki mocy** - wykresy i dane dotyczące zużycia energii
- **Wykres jakości powietrza** - historyczne i bieżące dane o jakości powietrza
- **Status urządzeń** - informacje o stanie urządzeń w sieci
- **Mapa sieci** - wizualizacja sieci energetycznej
- **Analiza awarii** - dane dotyczące awarii i problemów
- **Mapa energetyczna** - geograficzna mapa zużycia energii

Możesz wchodzić w interakcję z kafelkami, aby zobaczyć szczegółowe informacje, a także przeciągać je, aby dostosować układ do swoich potrzeb.

## Asystent AI i przetwarzanie dokumentów

### Wgrywanie i analiza dokumentów
1. Przewiń na dół strony głównej do sekcji "Wgraj pliki"
2. Przeciągnij i upuść pliki lub kliknij obszar, aby wybrać dokumenty
3. Obsługiwane formaty: PDF, DOCX, TXT, PNG, JPG

### Korzystanie z asystenta AI
1. Po wgraniu dokumentu przejdź do sekcji "Asystent AI"
2. Wpisz pytanie dotyczące zawartości dokumentu lub zagadnień związanych z energią/jakością powietrza
3. Asystent wykorzysta zaawansowaną technologię RAG (Retrieval-Augmented Generation), aby udzielić odpowiedzi bazując na:
   - Wgranych dokumentach
   - Swojej wiedzy ogólnej
   - Danych kontekstowych systemu

Przykładowe pytania:
- "Podsumuj najważniejsze punkty z wgranego dokumentu"
- "Jakie są główne zanieczyszczenia powietrza i ich wpływ na zdrowie?"
- "Jak mogę zoptymalizować zużycie energii w moim domu?"

## Mapy jakości powietrza w województwie pomorskim

Zakładka "Mapy jakości powietrza" zawiera:
- Interaktywną mapę z danymi ze stacji pomiarowych Airly
- Legendę tłumaczącą kolorystykę oznaczeń
- Informacje o aktualnym stanie powietrza w wybranych lokalizacjach

Funkcje mapy:
1. **Przybliżanie i oddalanie** - użyj przycisków + i - lub kółka myszy
2. **Wybór stacji** - kliknij marker, aby zobaczyć szczegółowe dane
3. **Zmiana widoku mapy** - użyj kontrolek w prawym górnym rogu mapy

## Rozwiązywanie problemów

### Problemy z wczytywaniem mapy
Jeśli mapa nie wyświetla się poprawnie:
- Upewnij się, że masz stabilne połączenie z internetem
- Spróbuj odświeżyć stronę
- Wyczyść pamięć podręczną przeglądarki

### Problemy z asystentem AI
Jeśli asystent AI nie działa poprawnie:
- Sprawdź, czy wprowadziłeś poprawny klucz API Gemini
- Upewnij się, że masz połączenie z internetem
- Sprawdź wielkość wgranego dokumentu (maksymalny rozmiar to 10MB)
- Sprawdź w konsoli przeglądarki (F12) czy nie ma błędów

### Kontakt i wsparcie
Jeśli napotkasz problemy techniczne lub masz pytania dotyczące systemu:
- Sprawdź dokumentację techniczną
- Skontaktuj się z administratorem systemu

## Licencja i informacje dodatkowe

System Smart Grid & Air Quality Dashboard został opracowany jako narzędzie do monitorowania jakości powietrza i zużycia energii. Wykorzystuje zaawansowane algorytmy AI do analizy danych i zapewnienia użytkownikom inteligentnego wsparcia w podejmowaniu decyzji.

---

© 2024 Smart Grid & Air Quality Dashboard

## Konfiguracja

1. Skopiuj plik `.env.example` do `.env`:
```bash
cp .env.example .env
```

2. Uzupełnij zmienne środowiskowe w pliku `.env`:
- `VITE_ELEVENLABS_API_KEY` - klucz API do ElevenLabs (wymagany dla funkcji odtwarzania głosowego)

## Funkcje opcjonalne

### Odtwarzanie głosowe
Funkcja odtwarzania głosowego wymaga klucza API ElevenLabs. Możesz go uzyskać na stronie [ElevenLabs](https://elevenlabs.io/).

Działą!