#language: de
Funktionalität: Eingabe der Kreditkartendaten

  Hintergrund: Aufruf der Eingabeseite
    Gegeben sei die geöffnete Unterseite für die Eingabe der Kreditkartendaten
    Dann werden 5 Bilder für die Kreditkartenarten angezeigt
    Und es werden 4 Eingabefelder für Kreditkarteninformationen angezeigt

  Szenario: Eingabe einer VISA Kreditkarte markiert das VISA Bild
    Wenn ich in das Kreditkartenformular die Daten "Robert Habeck" "4998123456789345" "0926" "408" eintrage
    Dann wird als Karteninhaber "Robert Habeck" angezeigt
    Und es wird als Kreditkartennummer "4998 1234 5678 9345" angezeigt
    Und es wird als Ablaufdatum "09/26" angezeigt
    Und es wird als CCV "408" angezeigt
    Und das Bild der Visa-Karte ist farblich markiert

  Szenario: Eingabe einer MasterCard Kreditkarte markiert das MasterCard Bild
    Wenn ich in das Kreditkartenformular die Daten "Brunhilde von Schöppingen" "5355672317858940" "04/28" "123" eintrage
    Dann wird als Karteninhaber "Brunhilde von Schöppingen" angezeigt
    Und es wird als Kreditkartennummer "5355 6723 1785 8940" angezeigt
    Und es wird als Ablaufdatum "04/28" angezeigt
    Und es wird als CCV "123" angezeigt
    Und das Bild der MasterCard-Karte ist farblich markiert

  Szenario: Eingabe einer American Express Kreditkarte markiert das American Express Bild
    Wenn ich in das Kreditkartenformular die Daten "John Cena" "3456823456783456" "09/23" "404" eintrage
    Dann wird als Karteninhaber "John Cena" angezeigt
    Und es wird als Kreditkartennummer "3456 8234 5678 3456" angezeigt
    Und es wird als Ablaufdatum "09/23" angezeigt
    Und es wird als CCV "404" angezeigt
    Und das Bild der American Express-Karte ist farblich markiert

  Szenario: Eingabe einer Discover Kreditkarte markiert das Discover Bild
    Wenn ich in das Kreditkartenformular die Daten "Albert Rutherford" "6346 0000 2134 5432" "04/25" "5063" eintrage
    Dann wird als Karteninhaber "Albert Rutherford" angezeigt
    Und es wird als Kreditkartennummer "6346 0000 2134 5432" angezeigt
    Und es wird als Ablaufdatum "04/25" angezeigt
    Und es wird als CCV "5063" angezeigt
    Und das Bild der Discover-Karte ist farblich markiert

  Szenario: Eingabe einer generischen Kreditkarte markiert das Welt-Bild
    Wenn ich in das Kreditkartenformular die Daten "Silvia Möller" "7874 3435 4567 3456" "09/26" "125" eintrage
    Dann wird als Karteninhaber "Silvia Möller" angezeigt
    Und es wird als Kreditkartennummer "7874 3435 4567 3456" angezeigt
    Und es wird als Ablaufdatum "09/26" angezeigt
    Und es wird als CCV "125" angezeigt
    Und das Bild der Welt-Karte ist farblich markiert
