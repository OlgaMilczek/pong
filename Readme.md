#  Pong - Simple 2d game

## Reguły gry

Pong to prosta gra 2d, która symuluje grę w tenisa stołowego. \
Gracz porusza "paletką" lewo-prawo i odbija piłeczkę. Paletka umieszczona jest na końcu planszy/boiska. \
Gracz gra przeciwko przeciwnikowi, którego paletka umieszczona jest po przecinwne stronie planszy. \
Przeciwniekiem może być inny gracz lub komputerer. Punkty są zdobywane kiedy przeciwnik nie zdąży odbić piłeczki i ta wyleci poza linie, po której porusza się jego paletka. Gra kończy się gdy któryś z graczu uzyska 21 punktów. 

## Problemy i propozycje rozwiązań. 

1. Wykrycie kolizji - piłka ściana / piłka paletka: \
Ta funkcja powinna sparwdzać czy pozycja piłki (po odjęciu jej prominia) jest równa (albo lekko mniejsza pewnie też), niż pozycja paletki bądź ściany.

2. Wykrycie nowego kierunku piłki po uderzeniu w pletkę: \
Pytanie ile ma być możliwych kątów odbica? \
Sprawdzenie w którym miejscy paletki piłka uderzyła w paletkę. \
Jeżeli w okolicach środka (np około 5px od środka w lewo i prawo) w środek to piłka odbija się prostopadle do paletki. \
Jeżeli na lewo lub prawo od środka to odpowiednio kąt powinien być odpowidać kątowi uderzenia?? 

3. Wykrycie nowego kierunku piłki po uderzeniu w ścianę: \
Kąt uderzenia równa się kątowi odbicia - czyli po wykryciu uderzenia w ścianę, przekazywany jest piłce kąt odbicia (pytanie to samo co powyżej ile ma być mozliwych kątów odbicia)

3. Wykrycie zdobytego punktu: \
Ta funcja powinna sprawdzać czy pozycja piłki jest za pozycją paletki (czy piłka znajduję się w przestrzeni pomiędzy paletką a końcem planszy). \
Jeżeli piłka jest za pozycją paletki to wywoływać funckje do przekazania punktu graczowi i rozpoczęcia nowej rundy. (piłka na środku planszy). 

4. Ruchy komputera: 
Komputer może posiadać informacje o pozycji piłki i jej kierunku. Na tej podstawie obliczać przyszła pozycję piłki i poruszać paletkę w miesce które powinna znaleźć się paletka. 

## Podział klasowy - OOP

Program powininen być podzielony na dwie gówne sekcje:
1. Logika gry i jej podstawowe elementy (tzw. silnik odpowiedzialny).
2. Odpowiedzialna ze renderowanie i wyświetlanie.  

### Silnik - logika gry: 

**Piłka:**
- Własności:
    - Pozycja (koordynaty x i y)
    - Wielkość (promień)
    - Prędkość
    - Kirunek poruszania się
- Metody:
    - Poruszanie się i przyspieszenie 
    - Zmiana kierunku

**Paletak (Gracz):**
- Własności:
    - Pozycja
    - Wielkość (szerokość i grubość)
    - Wynik (ilość zdobytych punktów). 
- Metody:
    - Poruszanie paletką
    - Poruszanie paletką przez komputer
    - Zwiększanie wyniku gracza

**Plansza/boisko:**
- Własności:
    - Wymiary boiska
    - Dwie paletki (graczy).
    - Piłka
- Metody:
    - Wykrycie zdobytego punktu
    - Przekazanie zdobytego punktu do odpowiedniego gracza. 
    - Sprawdzenie czy któryś gracz wygrał.
    - Rozpoczęcie nowej rubndy (po zdobyciu przez gracza punktu)

    - Wykrycie odbicia od ściany
    - Odbicie piłki przez ścianę (przekazanie zmiany kierunku do piłki)
    - Wykrycie odbicia przez gracza
    - Metoda odpowiedzialna za znalezienie nowego kierunku poruszania się piłki (zwraca nowy kierunek)

    - Sprawdzenie nowego kierunku piłki nadanego przez paletkę i przekazanie nowego kierunku piłce. 


