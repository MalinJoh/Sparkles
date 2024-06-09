PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE products ( id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, image TEXT);
INSERT INTO products VALUES(1,'ring','Prehnite Ring','Denna eleganta ring pryds av en vackert slipad perhnit kristall som är en sten för drömmande och kreativt tänkande.  Med sin klara, transparenta glans är denna ring perfekt för både vardag och speciella tillfällen. Prehnit kristallen är omsorgsfullt infattad i en sterling silverring, vilket skapar en harmonisk och sofistikerad look.',1299.9899999999999877,'Bilder/prehnite.jpg');
INSERT INTO products VALUES(2,'ring','Pink Quartz Ring','Denna magnifika ring är prydd med en kvartssten som är känd för sin rika färg.  Med sin subtila rosa ton är denna ring ett perfekt tillskott till vilken smyckesamling som helst.  Infattad i vitt guld, är denna ring en symbol för lyx och elegans,  perfekt för de mest exklusiva tillfällen.',1699.9900000000001121,'Bilder/pink.jpg');
INSERT INTO products VALUES(3,'ring','Green Gemstone Ring','Denna ring är prydd med en djupt grön agat ädelsten,  känd för sin överlägsna skönhet och sällsynthet.  Stenen är infattad i vitt guld. Denna ring är en symbol för lyx och elegans,  perfekt för de mest exklusiva tillfällen.',1899.9900000000000233,'Bilder/turkos.jpg');
INSERT INTO products VALUES(4,'necklace','Mystic Agate Necklace','Vårt Mystic Agate Necklace är prytt med en fängslande agatsten som utstrålar naturlig skönhet och mystik. Varje agat är unik med sina vackra band och mönster, infattad i en elegant kedja av sterling silver. Detta halsband är en perfekt kombination av naturlig charm och sofistikering, idealisk för både vardag och fest.',3899.9899999999998456,'Bilder/agate.jpg');
INSERT INTO products VALUES(5,'necklace','Eternal Ankh Necklace','Vårt Eternal Ankh Necklace hyllar det tidlösa symboliska ankh-korset, känt som en symbol för liv och odödlighet. Denna ankh är utsmyckad med en vackra ädelstenar och infattad i en elegant kedja av sterling silver. Ett kraftfullt och elegant smycke som passar perfekt för att ge din outfit en touch av mystik och historia.',4499.9899999999994903,'Bilder/ankh.jpg');
INSERT INTO products VALUES(6,'necklace','Radiant Gemstone Necklace','Lys upp din stil med vårt Radiant Gemstone Necklace, smyckat med åtta st strålande ädelstenar som fångar ljuset på ett fantastiskt sätt. De noggrant slipade ädelstenar är infattad i en vacker kedja av vitt guld, vilket ger elegans. Ett mångsidigt smycke som passar för alla tillfällen.',5899.9899999999998456,'Bilder/gemstone.jpg');
INSERT INTO products VALUES(7,'necklace','Enchanted Fluorite Necklace','Vårt Enchanted Fluorite Necklace är dekorerat med en hypnotiserande fluoritsten, känd för sina skimrande färger och lugnande egenskaper. Fluoritstenen är infattad i en subtil kedja av sterling silver, vilket framhäver dess naturliga skönhet. Detta halsband är det perfekta valet för att lägga till en touch av magi och elegans till din smyckeskollektion.',4299.9900000000002009,'Bilder/fluorite.jpg');
INSERT INTO products VALUES(8,'bracelet','Emerald Twilight Bracelet','Upplev en touch av naturens elegans med vårt Emerald Twilight Bracelet. Detta armband pryds av gnistrande gröna safirer, kända för sin rika färg och lyster. Infattade i en elegant kedja av vitt guld, kombinerar dessa stenar naturlig skönhet med sofistikering. Perfekt för både vardag och fest, detta armband är en hyllning till tidlös elegans.',2299.9899999999997568,'Bilder/green.png');
INSERT INTO products VALUES(9,'bracelet','Autumn Grace Bracelet','Fånga höstens värme med vårt Autumn Grace Bracelet. De djupt bruna safirerna utstrålar en jordnära skönhet som kompletteras av en kedja av vitt guld. Detta armband är designat för att reflektera naturens skiftande färger och passar perfekt för alla tillfällen. En elegant accessoar som tillför en touch av rustik charm till din smyckesamling.',2299.9899999999997568,'Bilder/brown.png');
INSERT INTO products VALUES(10,'bracelet','Midnight Sapphire Bracelet','Lys upp natten med vårt Midnight Sapphire Bracelet. Dessa djupblå safirer fångar nattens mystik och är vackert infattade i en kedja av vitt guld. Detta armband är en symbol för elegans och förfining, och är perfekt för att lägga till en touch av lyx till vilken outfit som helst. Ett tidlöst smycke för alla tillfällen.',2299.9899999999997568,'Bilder/blue.png');
INSERT INTO products VALUES(11,'bracelet','Snowflake Elegance Bracelet','Vårt Snowflake Elegance Bracelet är prytt med skimrande vita ädelstenar som fångar ljuset och utstrålar en ren och sofistikerad skönhet. Infattade i en kedja av vitt guld, är dessa stenar en symbol för renhet och elegans. Detta armband är perfekt för att lägga till en touch av glans till både vardagliga och formella kläder.',2899.9899999999998456,'Bilder/white.png');
INSERT INTO products VALUES(12,'bracelet','Sky Dream Bracelet','Fly till himlens lugn med vårt Sky Dream Bracelet. De ljusblå ädelstenarna i detta armband utstrålar en känsla av ro och klarhet, infattade i en kedja av vitt guld. Detta smycke är designat för att framhäva den lugna skönheten hos de ljusblå stenarna, vilket gör det till ett perfekt tillskott till din smyckesamling.',2899.9899999999998456,'Bilder/lightblue.png');
INSERT INTO products VALUES(13,'bracelet','Lavender Mist Bracelet','Fånga skönheten hos vårens blomning med vårt Lavender Mist Bracelet. Denna unika design pryds av lila-vit fluorit som utstrålar en förtrollande blandning av färger. Infattad i en subtil kedja av vitt guld, är detta armband en perfekt kombination av naturlig elegans och modern stil. Ett perfekt smycke för att lägga till en touch av färg och charm till din look.',1999.9900000000000233,'Bilder/purple.png');
CREATE TABLE orders (
   ...>     id INTEGER PRIMARY KEY AUTOINCREMENT,
   ...>     product_id INTEGER,
   ...>     size INTEGER,
   ...>     quantity INTEGER NOT NULL,
   ...>     order_date TEXT DEFAULT (datetime('now')),
   ...>     product_name TEXT,
   ...>     price REAL, first_name TEXT, last_name TEXT,shipping_method TEXT,
   ...>     payment_method TEXT,
   ...>     address TEXT,
   ...>     city TEXT,
   ...>     postal_code TEXT,
   ...>     FOREIGN KEY (product_id) REFERENCES products(id)
   ...> );

DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('products',13);
COMMIT;
