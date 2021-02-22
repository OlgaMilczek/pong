## Ruch piłki 
    Do pozycji piłki na osi x i y. 
    Co interwał zostaje dodana wartość
    DeltaX i DeltaY pomnożona przez przyjętą prędkość piłki.

## Wykrywanie kolizji: 
    - pozycja piłki na osi X pX.
    - Pozycja piłki na osi Y - pY.
    - promień piłki - R.
    - Wymiary na osi X. 
    - Wymiar na osi Y. 
    - Pozycje paletki Gracza. 
    - Pozycja paletki Komutera (drugiego gracza).

Sprawdzamy czy pY + R jest mniejsza niż 0 || pY + R jest większa niż wymiar Y
I czy pX mieści się w zakresie boiska (nie za paletką). 
    Jeżeli tak to nasza piłka jest odbita przez ścianę
    I wywołujemy funkcje dla odbijania piłeczki ze żródłem (ściana).

Sprawdzamy czy pX + R jest równe x Paletki (plus minus jakiś zakres bezpieczeństwa)
    Jeżeli tak to sprawdzamy czy pY + R mieści się w zakresie od początku paletki w aktualnej pozycji do końca paletki.
        Jeżeli sie mieści to znaczy, że piłeczka została odbita przez gracza i wywołujemy funkcje do obcia piłeczk ze źródlem (gracz). 

        Jeżeli nie to znaczy, że piłka został wbita przez przeciwnika. 
            Przeciwnki zdobywa punkt. 
            Gra sprawdza czy któryś z graczy ma już 21 punktów

            Jeżeli tak 
                To gra się kończy 
            Jeżeli nie 
                To rozpoczyna się nowa runda.

## Odbijanie piłekczki:
Algorytm odbicia powinien przyjmować: 

- deltaX (przesunięcie na osi x)
- deltaY (przesunięcie na osi y)
- rodzaj przeszkody (czy paletka, czy ściana)
- promień połki

W pierwszym kroku sprawdzamy czy przeszkoda to ściana czy paletka: 
Jeżel ściana to: 
    Wynika, że deltaX pozostaje bez zmian, 
    deltaY to przeciwieństwo obecnej deltyY. 

Jeżeli paletka: 
    Wynika z tego, że deltaY pozostaje bez zmian. 
    Zmienia się tylko DeltaX (na przeciwieństwo obecnej deltyX). 
