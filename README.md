## Kilka słów od rekrutowanego ;)

Problem z sortowaniem polegał na tym, że podczas mapowania zagnieżdżonych kategorii używany był tytuł przodka z pierwszego poziomu, aby oznaczyć kolejność.
Po zmianie na używanie odpowiedniego tytułu, sortowanie działa poprawnie.

Pozwoliłem sobie dodatkowo przerefectorować funkcję categoryTree, aby była w moim odczuciu bardziej czytelna, wykorzystywała rekurencję, aby nie powtarzać kodu.

Mam nadzieję, że nie będzie problemem, że dotknąłem pliku `mockedApi.ts`, zależało mi, aby współdzielone typy znalazły się w miejscu, z którego importowanie nie wprowadza dezorientacji.  

Na koniec, aby spełnić wszystkie założenia dotyczące logiki oznaczania kategorii wyświetlanych na stronie głównej, musimy ponownie wykonać operację na całym zbiorze, bo dopiero wtedy jest ustalona odpowiednia kolejność kategorii.
Podczas pierwszej iteracji jedynie oznaczam kategorie, które potencjalnie mogą być widoczne na stronie głównej, na podstawie znanych informacji. Aby w kolejnej pętli (jeśli się wydarzy) było mniej operacji do wykonania.

## A co my tu mamy?

W pliku **task.ts** mamy funkcje która pobiera drzewo kategorii pewnych produktów z zewnętrznego źródła, odpowiednio je mapuje i zwraca.
Dodatkowo funkcja **categoryTree** zawiera błąd, polegający na niewłaściwym sortowaniu kategorii drugiego poziomu (szczegóły w wymaganiach do zadania).

W pliku **mockedApi.ts** znajduje się fejkowe źródło danych i tam nie ma potrzeby nic zmieniać.

## Co należy zrobić?

1. Refactor funkcji categoryTree. Wszystkie chwyty dozwolone. Dzielenie funkcji, wynoszenie zależności, zmiana parametrów wejściowych, etc...
2. Źródło danych (funkcja getCategories) powinna być przekazywana jako zależność. W idealnym scenariuszu categoryTree opiera się na abstrakcji i nie jest świadoma co konretnie zostanie jej przekazane
3. Poprawiony zostanie bug opisany poniżej.
4. W osobnym pliku przeprowadzony zostanie dowód (w postaci kodu) który jednoznacznie pokaże poprawność działania funkcji categoryTree.

> Wszystkie potrzebne paczki są już w tym repozytorium, aczkolwiek można użyć dowolnych.

## Na czym polega bug?

Dla każdej pobieranej kategorii, w parametrze **Title** moze być zawarta opcjonalna numeracja która powinna definiować kolejność zwracaną przez funkcje (w polu **order**).
Na ten moment sortowanie działa nieprawidłowo, należy to poprawić.

> Dla wejścia znajdującego się w pliku **input.ts**, w tym momencie funkcja zwraca takie wyjście jak w pliku **currentResult.ts**. Oczekiwane wyjście zawarte jest w pliku **correctResult.ts**

## Jak używać tego repo

Najważniejsza komenda dla tego zadania to **npm run test** - buduje ona TSa i odpala testy. Ta komenda się wywali jeśli kod nie przejdzie eslinta i prettiera. Zatem żeby sprawdzić swoje zadanie należy najpierw pozbyć się błędów z eslinta i odpalić **fix:prettier**.
