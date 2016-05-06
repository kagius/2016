# MHFA International Meeting 2016 Information Page

## Site structure
* */* Root
  * */[language]* Localized Home Page
    * */[language]/[instructors]* List of instructors and lesson titles
      * */[language]/[instructors]/[key]* Instructor and lesson detail page
    * */[language]/[venue]* About the venue
    * */[language]/[accommodation]* About the accommodation
    * */[language]/[register]* Registration form

## Localisations
Localisation files are defined in the 'i18n' folder. Files must follow the
naming convention "/i18n/[route key]/[two letter language code].json", for example
"/i18n/home/en.json". Shared resources go into the "common folder".

## Planned tasks
* Open graph support
* Event programme with Google calendar support
* Registration form
* Share on Facebook
* Best guess language selection on root
