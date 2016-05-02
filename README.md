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
Localisation files are defined in the 'locales' folder. Files must follow the
naming convention "locale-[two letter language code].json", for example
"locale-en.json".

Content for the pages is currently loaded separately from the 'content' folder. As an improvement, this should be changed to use the partial loader implementation as described in the [angular-translate documentation](http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading)

## Planned tasks

* Open graph support
* Event programme with Google calendar support
* Registration form
* Share on Facebook
