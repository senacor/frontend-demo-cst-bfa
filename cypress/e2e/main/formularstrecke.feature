#language: de
Funktionalität: Bearbeitung der Formularstrecke

  Hintergrund: Aufruf des Formulars
    Gegeben sei ein Aufruf der Seite unter "/formular"
    Und das Formular zeigt im Kreditkartenabschnitt den Text "No credit card information available" an

  Szenario: Eingabe einer VISA Kreditkarte
    Wenn ich den Button "Enter credit card information" anklicke
    Und ich in das Kreditkartenformular die Daten "Robert Habeck" "4998 1234 5678 9345" "09/26" "408" eintrage
    Und auf den "Apply credit card information" Button klicke
    Dann befinde ich mich auf der Übersichtsseite
    Und das Formular zeigt "Account holder" als "Robert Habeck" an
    Und das Formular zeigt "CC #" als "4998 **** **** *345" an
    Und das Formular zeigt "Expiration" als "09/26" an
    Und das Formular zeigt "CCV" als "408" an

  Szenario: Löschen von eingegebenen Kreditkarteninformationen funktioniert wie erwartet
    Wenn ich Kreditkartendaten eingegeben habe
    Und auf den "Delete credit card information" Button klicke
    Und zeigt das Formular im Kreditkartenabschnitt den Text "No credit card information available" an
