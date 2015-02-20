# MY PRIVATE WEBSITE (works as a portfolio etc)
Below extra information on how I can do stuff

## Sovelluksen käynnistys

Sovellus käynnistyy osoitteeseen http://localhost:3000 suorittamalla

```sh
npm install
PORT=3000 npm start
```

## Repositorion sisältö

Tämä harjoitustyöpohja on luotu käyttämällä
[express-generator:ia](http://expressjs.com/starter/generator.html),
lisäämällä siihen [Sequelize](http://sequelizejs.com/)-kirjasto suunnilleen
[tässä tutoriaalissa](http://sequelizejs.com/articles/express) esitetyllä tavalla
sekä tekemällä siihen päälle muutama pikkusäätö.

Seuraavassa pieni kuvaus pohjassa olevista tiedostoista.
Kaikkia tiedostoja saa vapaasti muokata.

#### package.json
[npm](https://www.npmjs.com/)-paketinhallinnan konfiguuraatio.
Voit asentaa uusia npm-paketteja joko muokkaamalla tätä tiedostoa tai ehkä parempi tapa on suorittaa

```sh
npm install PAKETIN_NIMI --save
```

#### Procfile
[Heroku](https://www.heroku.com/)-konfiguraatio.
Tätä ei luultavasti tarvitse muokata.

#### app.js
"Pääohjelma".

#### models/
[Sequelize](http://sequelizejs.com/)-tietomallit.
Tiedosto `models/index.js` luo yhteyden tietokantaan
ja lataa kaikki mallit tästä kansiosta.

Voit luoda uusia tietomalleja luomalla uusia tiedostoja
olemassaolevan `user.js` lisäksi.

#### routes/
Express:in reitit.
Tiedostossa `app.js` asetetaan tietty polku osoittamaan tiettyyn `routes/`-kansiossa olevaan tiedostoon, jolloin
ko. polkuun kohdistuvat HTTP-pyynnöt ohjautuvat tälle.

#### views/
Näkymät. Käyttävät oletuksena
[ejs](http://www.embeddedjs.com/)-sivupohjamoottoria.

#### public/
Kansio staattisille CSS-, JavaScript-, ym. tiedostoille.
Nämä web-palvelin tarjoilee sellaisenaan.

#### bin/
Tässä kansiossa on pari skriptiä, joita ei luultavasti tarvitse muokata.

`bin/www` on sovelluksen käynnistysskripti.
Sen voi suorittaa myös komennolla `npm start`.

`bin/reset-dbs` on skripti tietokantojen alustukseen.

**HUOM:** kun muutat jotain Sequelizen mallia,
jota vastaava taulu on jo tietokannassa, täytyy `bin/reset-dbs` suorittaa.
Vasta tällöin tietokantarakenteen muutokset tulevat voimaan.
Tyhjentää samalla tietokannan.

#### Vagrantfile ja bootstrap.sh
Vagrant-ympäristön konfiguraatio.



