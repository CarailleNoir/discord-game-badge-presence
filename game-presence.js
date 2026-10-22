(() => {
    "use strict";

    const LOCK = "__gamePresence";
    const STORAGE_KEY = "game-presence-v2";

    if (window[LOCK]?.stop) {
        console.warn("[Game Presence] Déjà lancé. Pour arrêter : window.__gamePresence.stop()");
        return;
    }

    const CATALOG = [
        ["SpeedRunners","259392830932254721","207140"],
        ["Move or Die","343232907390746625","323850"],
        ["Holodrive","346729383693778944","370770"],
        ["GRIP","348146938681622538","396900"],
        ["Hellion","349114016968474626","588210"],
        ["Divinity Original Sin 2","349134787773988865","435150"],
        ["Foxhole","349947310375043074","505460"],
        ["Unturned","351821143981817856","304930"],
        ["Battlerite","352378924317147156","504370"],
        ["League of Legends","356869127241072640"],
        ["PLAYERUNKNOWN'S BATTLEGROUNDS","356873622985506820","578080"],
        ["Counter-Strike: Global Offensive","356875057940791296","730"],
        ["Overwatch","356875221078245376"],
        ["Minecraft","356875570916753438"],
        ["World of Warcraft","356875762940379136"],
        ["Hearthstone","356875890958925834"],
        ["Dota 2","356875988589740042","570"],
        ["Grand Theft Auto V","356876176465199104","271590"],
        ["Tom Clancy's Rainbow Six Siege","356876590342340608","359550"],
        ["Rocket League","356877880938070016","252950"],
        ["Heroes of the Storm","356878860190613504"],
        ["Garry's Mod","356879032584896512","4000"],
        ["H1Z1: King of the Kill","356881342321000448","433850"],
        ["ARK: Survival Evolved","356887282982191114","346110"],
        ["Path of Exile","356888453796986880","238960"],
        ["Team Fortress 2","356888577310851072","440"],
        ["Rust","356888738724446208","252490"],
        ["World of Tanks","356888961353908224"],
        ["FINAL FANTASY XIV","356889262362329098"],
        ["Geometry Dash","356942674672091136","322170"],
        ["Dolphin","356943187589201930"],
        ["Terraria","356943499456937984","105600"],
        ["Brawlhalla","356944273133928458","291550"],
        ["The Walking Dead","356953358952562688","207610"],
        ["Sonic Mania","356953520278339584","584400"],
        ["Golf With Your Friends","356954034701205504","431240"],
        ["Cities: Skylines","356954111901433856","255710"],
        ["Arma 3","356954176338788352","107410"],
        ["Left 4 Dead 2","356954277803065354","550"],
        ["Project 64","357606193918771210"],
        ["RuneScape","357606832899883008"],
        ["Dead by Daylight","357607133254254632","381210"],
        ["War Thunder","357607478105604096","236390"],
        ["World of Warships","357607617046249482"],
        ["Duelyst","357706468843061258","291410"],
        ["Battlefield 1","358417041981571082"],
        ["The Binding of Isaac: Rebirth","358420454764969994","250900"],
        ["Black Desert Online","358420844491440148","582660"],
        ["Black Squad","358421399670358026","550650"],
        ["HIVESWAP: ACT 1","358421573071536128","623940"],
        ["Hearts of Iron IV","358421669603311616","394360"],
        ["Monaco","358421725139959808","113020"],
        ["Blade & Soul","358421781398421514"],
        ["Sid Meier's Civilization V","358421904601776138"],
        ["SMITE","358422012990849024","386360"],
        ["Factorio","358422126602223616","427520"],
        ["Diablo III","358425751197974528"],
        ["StarCraft II","358425800766128128"],
        ["The Elder Scrolls V: Skyrim","359507724196773888","72850"],
        ["Tom Clancy's The Division","359507798930751488","365590"],
        ["Don't Starve Together","359508004078616586","322330"],
        ["ShellShock Live","359508342571401216","326460"],
        ["Space Engineers","359508404034600990","244850"],
        ["Euro Truck Simulator 2","359508713658253318","227300"],
        ["Portal 2","359508941782122496","620"],
        ["The Sims 4","359509007423242240"],
        ["Call of Duty: Black Ops III","359509332490059776","311210"],
        ["Stardew Valley","359509387670192128","413150"],
        ["DARK SOULS III","359509500199436288","374320"],
        ["Counter-Strike: Source","359509666876751872","240"],
        ["Fallout 4","359509759642042378","377160"],
        ["Fallout: New Vegas","359509858728542208","22380"],
        ["MapleStory","359510095811444736"],
        ["The Witcher 3: Wild Hunt","359510249486417920","292030"],
        ["Half-Life 2","359510373361254400","220"],
        ["Battlefield 4","359510680459673610"],
        ["XCOM 2","359510740878491658","268500"],
        ["Guild Wars 2","359511228445491200"],
        ["The Elder Scrolls V: Skyrim Special Edition","359801269008859136","489830"],
        ["Tooth and Tail","360541292578471937","286000"],
        ["Outlast","363408634568376320","238320"],
        ["Depth","363408709495291934","274940"],
        ["Tabletop Simulator","363408834095742976","286160"],
        ["Stellaris","363408909962182683","281990"],
        ["Trove","363409000399634432","304050"],
        ["Gang Beasts","363409129643180032","285900"],
        ["The Forest","363409179668512788","242760"],
        ["Insurgency","363409205740175360","222880"],
        ["Europa Universalis IV","363409417632481280","236850"],
        ["Town of Salem","363409453699170304","334230"],
        ["Robocraft","363409532480913408","301520"],
        ["Golf It!","363409575321403402","571740"],
        ["Shadowverse","363409615620407316","453480"],
        ["7 Days to Die","363409643973771264","251570"],
        ["Killing Floor 2","363409749175173120","232090"],
        ["StarCraft","363409793119158272"],
        ["Undertale","363409849859571722","391540"],
        ["Duck Game","363410951518552064","312530"],
        ["Dirty Bomb","363411048713420800","333930"],
        ["Business Tour - Online Multiplayer Board Game","363411278527594516","397900"],
        ["Fallout Shelter","363411364552638464","588430"],
        ["Slime Rancher","363411395854991400","433340"],
        ["Last Man Standing","363411421553360896","506540"],
        ["Titanfall 2","363411468441354240"],
        ["STAR WARS™ Battlefront™","363412167934083072"],
        ["Mount & Blade: Warband","363412302998929418","48700"],
        ["STAR WARS: The Old Republic","363412489599188992"],
        ["PlanetSide 2","363412528308682752","218230"],
        ["Clicker Heroes","363412660680785940","363970"],
        ["Psychonauts","363412675650125825","3830"],
        ["American Truck Simulator","363412692083671040","270880"],
        ["Call of Duty: World at War","363412728888557568","10090"],
        ["Crossout","363412799117852672","386180"],
        ["Dofus","363412841862266880"],
        ["Comedy Night","363413176605212682","665360"],
        ["Enter the Gungeon","363413202090065920","311690"],
        ["Elite Dangerous","363413225578037248","359320"],
        ["Wizard101","363413310474813450"],
        ["AdVenture Capitalist","363413365667921930","346900"],
        ["Age of Empires II: HD Edition","363413389021675530","221380"],
        ["EVE Online","363413402300710912","8500"],
        ["Heat Signature","363413452976553984","268130"],
        ["RimWorld","363413465584500737","294100"],
        ["WarThunder","363413661567680522"],
        ["Rivals of Aether","363413717267906560","383980"],
        ["BeamNG.drive","363413743335374859","284160"],
        ["Subnautica","363413811518242816","264710"],
        ["Sid Meier's Civilization VI","363413834301571072","289070"],
        ["The Elder Scrolls Online","363413894602948608"],
        ["DOOM","363413961967927306","379720"],
        ["FTL: Faster Than Light","363414030188150801","212680"],
        ["Realm of the Mad God","363414084542005258","200210"],
        ["Just Cause 3","363414140502671360","225540"],
        ["Portal","363414173457186826","400"],
        ["Dead Cells","363414360422612992","588650"],
        ["FIFA 17","363414398129274890"],
        ["DRAGON BALL XENOVERSE 2","363414443129831444","454650"],
        ["Friday the 13th: The Game","363414482615271434","438740"],
        ["Prison Architect","363414635812093962","233450"],
        ["TEKKEN 7","363414667797725184","389730"],
        ["The Escapists 2","363414712186306560","641990"],
        ["Crusader Kings II","363414742661988352","203770"],
        ["Microtransaction Simulator","363414852410015744","689090"],
        ["Middle-earth: Shadow of Mordor","363424997080956928","241930"],
        ["METAL GEAR SOLID V: THE PHANTOM PAIN","363425113879609344","287700"],
        ["Idle Champions of the Forgotten Realms","363425133274333214","627690"],
        ["HuniePop","363425169051615262","339800"],
        ["Ultimate Chicken Horse","363425213905371146","386940"],
        ["NieR:Automata","363425276300099584","524220"],
        ["DARK SOULS II: Scholar of the First Sin","363426741269692416","335300"],
        ["Total War: WARHAMMER II","363426802640617482","594570"],
        ["Skullgirls","363426862363574272","245170"],
        ["Farming Simulator 17","363426921612181504","447020"],
        ["100% Orange Juice","363427044333191169","282800"],
        ["Crypt of the NecroDancer","363427101346627584","247080"],
        ["Call of Duty: Black Ops II","363427270024626176","202990"],
        ["Sonic Adventure 2","363427419249442816","213610"],
        ["Bloons TD Battles","363427491995713536","444640"],
        ["Dishonored","363427574707257354","205100"],
        ["Sven Co-op","363427674309263360","225840"],
        ["Tower Unite","363427800088313856","394690"],
        ["Dying Light","363427839137153024","239140"],
        ["Chivalry: Medieval Warfare","363427969324023808","219640"],
        ["Squad","363428011980357632","393380"],
        ["ASTRONEER","363428060604792832","361420"],
        ["Creativerse","363428103919239168","280790"],
        ["Oddworld: Abe's Oddysee","363428220617621504","15700"],
        ["Tom Clancy's Ghost Recon Wildlands","363428336749379604","460930"],
        ["Warhammer: End Times - Vermintide","363429268577058816","235540"],
        ["BattleBlock Theater","363429294778744832","238460"],
        ["Killing Floor","363429388156403712","1250"],
        ["Kerbal Space Program","363429406376722442","220200"],
        ["Rise of the Tomb Raider","363429423728427008","391220"],
        ["Castle Crashers","363429462076817408","204360"],
        ["Infestation: The New Z","363429491034554368","555570"],
        ["Mirage: Arcane Warfare","363429532377677824","368420"],
        ["Fistful of Frags","363429654540845056","265630"],
        ["STAR WARS™ Battlefront™ II","363429717698936852","6060"],
        ["Cuphead","363430002181668864","268910"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 4","363430045970071552","349040"],
        ["TERA","363430088521547786","323370"],
        ["Saints Row IV","363430103306338304","206420"],
        ["Absolver","363430239134547978","473690"],
        ["Total War: WARHAMMER","363430260810973194","364360"],
        ["Scrap Mechanic","363430304746176512","387990"],
        ["Oxygen Not Included","363430471322828800","457140"],
        ["Half-Life","363430548028522496","70"],
        ["Nuclear Throne","363430560942653440","242680"],
        ["No More Room in Hell","363430673694064640","224260"],
        ["The Sims 3","363430739456425994","47890"],
        ["Divinity: Original Sin Enhanced Edition","363430797257998356","373420"],
        ["Ravenfield","363430881811234816","636480"],
        ["Life is Strange","363430904867192832","319630"],
        ["Hollow Knight","363431029484027904","367520"],
        ["Saints Row: The Third","363431107527704576","55230"],
        ["Planet Coaster","363431197960962049","493340"],
        ["Dishonored 2","363431216000532480","403640"],
        ["Clustertruck","363431307629559808","397950"],
        ["Crush Crush","363431341599096842","459820"],
        ["Battlefield 3","363431403469144064"],
        ["World War II Online","363431447119527956","251950"],
        ["Company of Heroes 2","363431541336047616","231430"],
        ["Realm Grinder","363431556301193216","610080"],
        ["Project CARS","363431703504748544","234630"],
        ["Half-Life: C.A.G.E.D.","363431787214536704","679990"],
        ["Guitar Hero III: Legends of Rock","363431817312731136"],
        ["ROBLOX","363445589247131668"],
        ["Grand Theft Auto San Andreas","363447565905166336"],
        ["PAYDAY 2","364785249202208768","218620"],
        ["Ballistic Overkill","365200071941292033","296300"],
        ["Call of Duty®: WWII","365569601993572352","476620"],
        ["osu!","367827983903490050"],
        ["Destiny 2","372438022647578634"],
        ["Hob","372440317493903380","404680"],
        ["Fallout","372825995084038144","38400"],
        ["Middle-earth: Shadow of War","372826898465685519","356190"],
        ["Descenders","375540160571637760","681280"],
        ["Wolfenstein: The New Order","376171871873400832","201810"],
        ["Day of Infamy","376180187806695462","447820"],
        ["Deceit","376180386801123358","466240"],
        ["Darkest Dungeon","376180518749995028","262060"],
        ["Bendy and the Ink Machine","376180724291731472","622650"],
        ["A Hat in Time","376180889010307072","253230"],
        ["Besiege","376181155868966912","346010"],
        ["Life is Strange: Before the Storm","376181248596508672","554620"],
        ["GUNS UP!","376181312890863616","446150"],
        ["AT SUNDOWN: SitD","379732021385232385"],
        ["Warframe Dev","383379166323539969"],
        ["H1Z1","385537545276096522","433850"],
        ["Yu-Gi-Oh! Duel Links","385537699366305792","601510"],
        ["FIFA 18","385537854320934922"],
        ["Sanctum 2","385537957806866432","210770"],
        ["Human: Fall Flat","385538103831429120","477160"],
        ["Watch Dogs","385538279090683924"],
        ["Assassin's Creed Origins","385538388419280896","582160"],
        ["CS2D","385538625221165056","666220"],
        ["Wolfenstein II: The New Colossus","385538682184269834","612880"],
        ["DayZ","385538724592746496","221100"],
        ["Brutal Legend","385538840162467860","225260"],
        ["Zombidle","387375748262002710","612020"],
        ["Shadowrun: Hong Kong","387376045269057564","346940"],
        ["Rising Storm 2: Vietnam","387402304158040074","418460"],
        ["The Bureau: XCOM Declassified","387402716965634066","65930"],
        ["Elsword","387402920238383122","237310"],
        ["Total War: Rome 2","387403734080159763"],
        ["Freddy Fazbear's Pizzeria Simulator","389964632527339534","738060"],
        ["Getting Over It with Bennett Foddy","389968138688659466","240720"],
        ["Guns of Icarus Online","390293569832878098","209080"],
        ["Guns of Icarus Alliance","390293932199772160","608800"],
        ["Zombidle: REMONSTERED","393178973129015328","612020"],
        ["Guns N' Boxes","393511930838515742","483850"],
        ["VRChat","398632010442211348","438100"],
        ["Red Crucible: Firestorm","403373728290963478","298240"],
        ["Assassin's Creed IV Black Flag","406637677199360030","242050"],
        ["Escape from Tarkov","406637848297472017"],
        ["SCP: Secret Laboratory","406637935417622558","700330"],
        ["They Are Billions","406638043894775819","644930"],
        ["The Long Dark","406638150857785344","305620"],
        ["Pokémon Trading Card Game Online","406638244835622912"],
        ["Kingdom: Classic","406638362196312074","368230"],
        ["Don't Starve","406643893007024149","219740"],
        ["GWENT: The Witcher Card Game ","406643974183452681"],
        ["Long Live Santa!","406644036963663890","763410"],
        ["Slay the Spire","406644123832156160","646570"],
        ["Kingdoms and Castles","406645058599780368","569480"],
        ["Northgard","406645134445248530","466560"],
        ["Broforce","406645260987662366","274190"],
        ["CrossFire BR","406645350506561547"],
        ["Neverwinter","406645401437863936","109600"],
        ["Tibia","406645450863804416"],
        ["Papers, Please","406645580375392256","239030"],
        ["Closers","406645631864537088","215830"],
        ["Spore","406645798680657920","17390"],
        ["Plague Inc: Evolved","406645878980476928","246620"],
        ["Borderlands: The Pre-Sequel","406645950782636041","261640"],
        ["Hotline Miami","406646037571436544","219150"],
        ["Homefront","406646102297804826","55100"],
        ["theHunter™: Call of the Wild","406646161563189258","518790"],
        ["Tomb Raider","406646264093212682","203160"],
        ["The Binding of Isaac","406646308309434378","113200"],
        ["We Were Here","406646387875250186","582500"],
        ["This War of Mine","406646471098892298","282070"],
        ["Hotline Miami 2: Wrong Number","406646550731816960","274170"],
        ["Wulverblade","410909667334684672","587180"],
        ["Hand Simulator","418232964783144980","657200"],
        ["Kingdom Come: Deliverance","419267878014025728","379430"],
        ["DRAGON BALL FighterZ","419268865667629056","678950"],
        ["BATTALION 1944","419271532087607296","489940"],
        ["World of Tanks Blitz","419272031960432651","444200"],
        ["던전앤파이터","421150671836938240"],
        ["DARK SOULS™: Prepare To Die Edition","421150676710588416","211420"],
        ["Total War Arena","421150683329462272"],
        ["Doki Doki Literature Club","421150694683312138","698780"],
        ["Borderlands 2","421150698168909834","49520"],
        ["Forsaken Remastered","421798336694059018","668980"],
        ["SoulWorker","421858437039783936","630100"],
        ["Hunt: Showdown","422169383972896768","594650"],
        ["Warframe","422772752647323649","230410"],
        ["Warcraft III","424719708785344525"],
        ["Bastion","425404251292958736","107100"],
        ["Assassin's Creed Chronicles China","425433703041335346"],
        ["Assassin's Creed","425434240784662551","15100"],
        ["Assassin's Creed II","425434695908458519","33230"],
        ["Assassin's Creed III","425434783695503360"],
        ["Assassin's Creed Rogue","425434983080001556","311560"],
        ["Assassin's Creed Unity","425435152634609664","289650"],
        ["Assassin's Creed Brotherhood","425435232788021258","48190"],
        ["Assassin's Creed Revelations","425436928041680931","201870"],
        ["Batman: Arkham Knight","425437076188561408","208650"],
        ["Batman: Arkham Origins","425437243822571550","209000"],
        ["Batman: Arkham VR","425437344758366216","502820"],
        ["Beyond Good and Evil","425437404854222858"],
        ["F.E.A.R.","425437484735004682","21090"],
        ["F.E.A.R. 2: Project Origin","425437598836719616","16450"],
        ["F.E.A.R. 3","425437856169721856","21100"],
        ["Far Cry","425437906363219968","13520"],
        ["Far Cry 2","425437961669181477","19900"],
        ["Far Cry 4","425438134709518336","298110"],
        ["Far Cry Primal","425438207631556608","371660"],
        ["For Honor","425438403819995145"],
        ["Injustice: Gods Among Us Ultimate Edition","425438526491066388","242700"],
        ["Just Dance 2017","425438596883939328","446560"],
        ["LEGO® The Hobbit™","425439134551900190","285160"],
        ["LEGO® Worlds","425439198733008896","332310"],
        ["Mad Max","425439256001904650","234140"],
        ["Mortal Kombat Komplete Edition","425439413972238366","237110"],
        ["Mortal Kombat X","425439470075117573","307780"],
        ["Rayman Legends","425439545983500288","242550"],
        ["Rayman Origins","425439593882714133","207490"],
        ["Rocksmith 2014","425439633917214720","221680"],
        ["Scribblenauts Unlimited","425439683938353162","218680"],
        ["Steep","425439790746566666","460920"],
        ["The Crew","425439876939382804","241560"],
        ["The LEGO® Movie - Videogame","425439950553481216","267530"],
        ["Tom Clancy's Ghost Recon Future Soldier","425440004983226378","212630"],
        ["Tom Clancy's Splinter Cell","425440094263050250","13560"],
        ["Tom Clancy's Splinter Cell Blacklist","425440144829448192","235600"],
        ["Trackmania Turbo","425440195966664704","375900"],
        ["Trials Fusion","425440259539599390"],
        ["Watch_Dogs","425440319509626881","243470"],
        ["Watch_Dogs 2","425440363688493066","447040"],
        ["Darksiders Warmastered Edition","425440430772060160","462780"],
        ["ELEX","425440477882351626","411300"],
        ["Fade to Silence","425440525286637577","706020"],
        ["Impossible Creatures","425440563337232394","324680"],
        ["Ori and the Blind Forest: Definitive Edition","425440642173239296","387290"],
        ["Red Faction","425440700335915028","20530"],
        ["SpellForce 2 - Anniversary Edition","425440739166650368","39550"],
        ["The Guild 3","425440832238387200","311260"],
        ["Firewatch","425440941793345536","383870"],
        ["The Witness","425441014292152320","210970"],
        ["The Talos Principle","425441094482919464","257510"],
        ["The Surge","425441321512075264","378540"],
        ["Rebel Galaxy","425441408242155530","290300"],
        ["Fractured Space","425441448410873866","310380"],
        ["Planetary Annihilation: TITANS","425441516354273280","386070"],
        ["Hyper Light Drifter","425441571656433664","257850"],
        ["Stonehearth","425441650878316564","253250"],
        ["Obduction","425441688152965142","306760"],
        ["Shovel Knight","425441726736629760","250760"],
        ["Battle Chasers: Nightwar","425441774450901002","451020"],
        ["Wolcen: Lords of Mayhem","425441823754813455","424370"],
        ["Planet Nomads","425441961877700618","504050"],
        ["Agents of Mayhem","425442005766766592","304530"],
        ["Dead Island Definitive Edition","425442043616034816","383150"],
        ["Dead Island Riptide Definitive Edition","425442091666243594","383180"],
        ["DiRT 4","425442140731080704","421020"],
        ["F1 2016","425442173559767040","391040"],
        ["F1 2017","425442216639725578","515220"],
        ["Homefront: The Revolution","425442258020597760","223100"],
        ["Metro 2033 Redux","425442324495990784","286690"],
        ["Metro: Last Light Redux","425442388270645248","287390"],
        ["Micro Machines World Series","425442430922391552","535850"],
        ["Mighty No. 9","425442465244250132","314710"],
        ["Risen","425442503198769152","40300"],
        ["Ryse: Son of Rome","425442538288185344","302510"],
        ["Saints Row 2","425442587508211712","9480"],
        ["Bridge Constructor","425442642680348692","250460"],
        ["Bridge Constructor Portal","425442712095948800","684410"],
        ["Dead Age","425442752562462720","363930"],
        ["SEUM: Speedrunners from Hell","425442824134328320","457210"],
        ["BioShock 2","425442925967573002","8850"],
        ["BioShock™ 2 Remastered","425442965255880704","409720"],
        ["BioShock Infinite","425442995681230858","8870"],
        ["BioShock™ Remastered","425443045417156618","409710"],
        ["Borderlands","425443081916252160","8980"],
        ["Mafia","425443205195104277","40990"],
        ["Mafia II","425443244285886494","50130"],
        ["Mafia III","425443292831023113","360430"],
        ["Sid Meier's Civilization: Beyond Earth","425443404277743616","65980"],
        ["WWE 2K18","425443442181537792","664430"],
        ["Deponia","425443478525444106","214340"],
        ["Shadow Tactics: Blades of the Shogun","425443548079456285","418240"],
        ["Silence","425443601154048020","314790"],
        ["Kingdom: New Lands","425443637892218890","496300"],
        ["GoNNER","425443673698861066","437570"],
        ["Guild of Dungeoneering","425443709958488064","317820"],
        ["Antihero","425443745866186752","505640"],
        ["Let Them Come","425443777621131264","505630"],
        ["LEGO® STAR WARS™: The Force Awakens","425443938271363095","438640"],
        ["LEGO® MARVEL's Avengers","425449323346657290","405310"],
        ["LEGO® Jurassic World","425450411391057950","352400"],
        ["From Dust","425450802316967956","33460"],
        ["Rocksmith","425450896877420565","205190"],
        ["Tom Clancy's Ghost Recon","425451104117981184","15300"],
        ["ArcaniA","425451163807383552","39690"],
        ["MX vs. ATV Unleashed","425451199756632084","359220"],
        ["The Dwarves","425451237387796490","403970"],
        ["Sunless Skies","425451303985217536","596970"],
        ["Deadlight: Director's Cut","425451345865211904"],
        ["Sacred 3","425451387724234752","247950"],
        ["Trainz: A New Era","425451439318630424","315660"],
        ["The Inner World","425451474122833930","251430"],
        ["Assassin's Creed Freedom Cry","425453860392402964","277590"],
        ["Assassin's Creed Syndicate","425453938582487068"],
        ["Bloody Good Time","425453978114064424","2450"],
        ["Far Cry 3 Blood Dragon","425454019205529600"],
        ["I Am Alive","425454053795823626","214250"],
        ["Prince of Persia","425454114999369728","19980"],
        ["Black Mirror","425454162705252372","581300"],
        ["Darksiders II: Deathinitive Edition","425454199371726858","388410"],
        ["Delta Force: Land Warrior","425454276719017994","32640"],
        ["Full Spectrum Warrior","425454306737520650","4520"],
        ["Full Spectrum Warrior: Ten Hammers","425454342888488960","4530"],
        ["Men of Valor","425454383820570664","411330"],
        ["Nexus: The Jupiter Incident","425454420289912832","6420"],
        ["Sine Mora EX","425454457434931200","606730"],
        ["Sphinx and the Cursed Mummy","425454500883595264","606710"],
        ["The Book of Unwritten Tales 2","425454534907658240","279940"],
        ["The Guild Gold Edition","425454572778291210","39520"],
        ["Homesick","425454613827813376","244910"],
        ["Shroud of the Avatar","425454648623628288"],
        ["Descent: Underground","425454679854678036","360950"],
        ["Escape Dead Island","425454719817875456","226560"],
        ["Bridge Constructor Medieval","425454757130272768","319850"],
        ["Bridge Constructor Playground","425454789405704202","279990"],
        ["Bridge Constructor Stunts","425454826042818590","419080"],
        ["Deadly 30","425454866014404618","264730"],
        ["Dub Dash","425454898759598080","406940"],
        ["Looterkings","425454939452604436","397310"],
        ["Pixel Heroes: Byte & Magic","425454980489543680","338320"],
        ["Rockfest","425455011221471232","754640"],
        ["Slime-san","425455040082345984","473530"],
        ["A New Beginning - Final Cut","425455073661812766","105000"],
        ["AER Memories of Old","425455104632815636","331870"],
        ["Anna's Quest","425455138459746304","327220"],
        ["Blackguards","425455172714496015","249650"],
        ["Blackguards 2","425455204218175498","314830"],
        ["Crazy Machines 3","425455241597681664","351920"],
        ["Edna & Harvey: Harvey's New Eyes","425455277337214976","219910"],
        ["Edna & Harvey: The Breakout","425455323646787584","255320"],
        ["Journey of a Roach","425455356181872640","255300"],
        ["Ken Follett's The Pillars of the Earth","425455393401995264","234270"],
        ["Memoria","425455438050623498","243200"],
        ["Munin","425455471172911104","281750"],
        ["Shooting Stars!","425455505331191808","415350"],
        ["The Dark Eye: Chains of Satinav","425455537803755530","203830"],
        ["The Long Journey Home","425455571869761536","366910"],
        ["The Night of the Rabbit","425455612508241920","230820"],
        ["The Whispered World Special Edition","425455671052599296","268540"],
        ["Kathy Rain","425455715205906432","370910"],
        ["Uurnog Uurnlimited","425455750031081472","678850"],
        ["Dandara","425455780360355850","612390"],
        ["Armikrog","425455814497665034","334120"],
        ["Toren","425455851243831296","320820"],
        ["Call of Juarez - Gunslinger","425456506431995914"],
        ["Trials of the Blood Dragon","425456603765145656","435480"],
        ["Delta Force: Task Force Dagger","425456638154113044","32650"],
        ["Lock's Quest","425456670362042368","490080"],
        ["Rad Rodgers","425456700640985108","805660"],
        ["Tachyon: The Fringe","425456735050924032","32760"],
        ["The Book of Unwritten Tales: The Critter Chronicles","425456762569621514","221830"],
        ["Inside","425456795683913750"],
        ["The Universim","425456822258892810","352720"],
        ["Lost Horizon","425456853070118922","40350"],
        ["Grotesque Tactics: Evil Heroes","425456981332197386","46450"],
        ["In Between","425457045098070026","388420"],
        ["Meridian: New World","425457072818094080","265120"],
        ["Safety First!","425457108167950346","497700"],
        ["Townsmen","425457401769099297","486540"],
        ["Viking Rage","425457433565986838","589150"],
        ["Windscape","425457461731000320","363950"],
        ["Assassin's Creed Liberation HD","425457838731690003"],
        ["Justice League VR: The Complete Experience","425457887339348005","752750"],
        ["South Park The Stick of Truth","425457961574596608","213670"],
        ["Battle Worlds: Kronos","425458030537211904","237470"],
        ["Overclocked: A History of Violence","425458153262546944","339850"],
        ["SuperPower 2","425458179539730462"],
        ["This is the Police","425458210175188992"],
        ["Superhot","425458238595661854","322500"],
        ["Lost Horizon 2","425458269360750592","395560"],
        ["Metro Redux","425458328278401044"],
        ["Secret Files 3","425458354756911104","216210"],
        ["Clouds & Sheep 2","425458381835206656","439800"],
        ["Future Wars","425458408037285888","46440"],
        ["Game Royale 2 - The Secret of Jannis Island","425458432569638912","567010"],
        ["Greed: Black Border","425458464714653696","46400"],
        ["Holy Avatar vs. Maidens of the Dead","425458490878984192","261720"],
        ["Meridian: Squad 22","425458524865298432","451400"],
        ["Race.a.bit","425458558620925982","336030"],
        ["Shiny The Firefly","425458574731509760","277510"],
        ["Skilltree Saga","425458587985379328","315320"],
        ["SoulCraft","425458618108739614","369180"],
        ["Stellar Impact","425458648006000640","207150"],
        ["Subsiege","425458682566934538","338640"],
        ["Super Treasure Arena","425458718537154560","338330"],
        ["Trapped Dead: Lockdown","425458758504939540","305500"],
        ["TRISTOY","425458781451845632","303260"],
        ["Trulon: The Shadow Engine","425458804868513802","433840"],
        ["Twin Sector","425458819636920320","27900"],
        ["Gotham City Impostors Free to Play","425459839494389780","206210"],
        ["Heroes of Might and Magic III HD","425459913200762889","297000"],
        ["Might and Magic - Heroes V","425460002761998347","15170"],
        ["LEGO® Batman 2 DC Super Heroes™","425460322619490304","213330"],
        ["LEGO Batman","425460379624144925","21000"],
        ["LEGO Harry Potter: Years 1-4","425460457558769674","21130"],
        ["Scribblenauts Unmasked: A DC Comics Adventure","425460538110246912","249870"],
        ["Silent Hunter 3","425460595718881280","15210"],
        ["South Park Fractured But Whole","425460666930036736","488790"],
        ["Lord of the Rings: War in the North","425460776195719168","32800"],
        ["Tom Clancy's Rainbow Six 3","425460908345524224","19830"],
        ["Tom Clancy's Rainbow Six Vegas","425460989602037770","15120"],
        ["Tom Clancy's Rainbow Six Vegas II","425470018130673664","15120"],
        ["Tom Clancy's Splinter Cell Chaos Theory","425470107368554504","13570"],
        ["The Guild 2 Renaissance","425470196439056391","39680"],
        ["Soma","425470408322449418","282140"],
        ["Hellblade","425470569698557962","414340"],
        ["DiRT Rally","425471119068364819","310560"],
        ["Killer Is Dead - Nightmare Edition","425471324073230336","261110"],
        ["Saints Row: Gat out of Hell","425471448782733331","301910"],
        ["The Banner Saga","425471698284970020","237990"],
        ["Trackmania United Forever","425709280725958689","7200"],
        ["Trials Evolution","425709676965920788","220160"],
        ["Neighbours From Hell Compilation","425709808705077272","260750"],
        ["The Guild II","425710142252777508","39650"],
        ["The Flame in the Flood","425713116903505930","318600"],
        ["Dreamfall Chapters: The Longest Journey","425713647222784010","237850"],
        ["Risen 3 - Titan Lords","425714129152770048","249230"],
        ["Sacred 2 Gold","425714299877589002","225640"],
        ["Deponia: The Complete Journey","425714472997355560","292910"],
        ["Chaos on Deponia","425714655726665788","220740"],
        ["The Banner Saga 2","425722711180967946","281640"],
        ["Tormentor❌Punisher","425723123187449856","500670"],
        ["Assassin’s Creed® Chronicles: India","425725558626844702","359610"],
        ["Batman: Arkham Asylum GOTY Edition","425727574539370529","35140"],
        ["Brothers in Arms: Road to Hill 30","425727812490493972","15190"],
        ["Call of Juarez: Bound in Blood","425728267123949578","21980"],
        ["Child of Light","425728327505018921"],
        ["Prince of Persia: The Sands of Time","425728421788909568","13600"],
        ["Prince of Persia: Warrior Within","425728459600429056","13500"],
        ["Silent Hunter 5: Battle of the Atlantic","425728548586913812","48110"],
        ["Silent Hunter: Wolves of the Pacific","425728586192912384","15200"],
        ["The Lord of the Rings: War in the North","425728616450490368","32800"],
        ["Delta Force: Black Hawk Down","425731190570483757","32670"],
        ["Painkiller: Black Edition","425731299936960512","39530"],
        ["SpellForce: Platinum Edition","425731382820470824","39540"],
        ["The Guild II - Pirates of the European Seas","425731435929010195","39660"],
        ["Codename CURE","425748063416483870","355180"],
        ["Dungeon Defenders II","425748090889175050","236110"],
        ["Cry of Fear","425748259408183306","223710"],
        ["Blackwake","425748296854667264","420290"],
        ["Age of Empires® III: Complete Collection","425748312143167498","105450"],
        ["Far Cry® 3","425748544134053888","220240"],
        ["Football Manager 2018","425748782978826254","624090"],
        ["Total War: ATTILA","425748853132754945","325610"],
        ["FINAL FANTASY XV WINDOWS EDITION","425748942676819968","637650"],
        ["Evolve Stage 2","425748985517703188","273350"],
        ["Total War: SHOGUN 2","425749196403114024","34330"],
        ["Into the Breach","425749372332933120","590380"],
        ["Alien Swarm: Reactive Drop","425749425168580608","563560"],
        ["TrackMania Nations Forever","425749438573707264","11020"],
        ["Left 4 Dead","425749516583698432","500"],
        ["Amnesia: The Dark Descent","425749626671595520","57300"],
        ["Game Dev Tycoon","425749842451496961","239820"],
        ["Banished","425750064963780628","242920"],
        ["Of Guards And Thieves","425750237534224394","302590"],
        ["Who's Your Daddy","425751000477990922","427730"],
        ["FINAL FANTASY XV WINDOWS EDITION PLAYABLE DEMO","425751261095264276","671210"],
        ["Call of Duty: Modern Warfare 2","425777093628919828","10180"],
        ["Torchlight II","425777164361793547","200710"],
        ["Super Meat Boy","425777385103949834","40800"],
        ["Men of War: Assault Squad 2","425777482860331018","244450"],
        ["Darwin Project","425777491068715018","544920"],
        ["Hyper Universe","425777540263837706","591530"],
        ["Grim Dawn","425777682135908352","219990"],
        ["Rising Storm/Red Orchestra 2 Multiplayer","425777721159974922","35450"],
        ["Fishing Planet","425777941499215872","380600"],
        ["Assetto Corsa","425778010222886912","244210"],
        ["Aim Hero","425778246941016064","518030"],
        ["Source Filmmaker","425778288661757952","1840"],
        ["Poly Bridge","425778516320059392","367450"],
        ["DiRT 3 Complete Edition","425778620187803658","321040"],
        ["Goat Simulator","425778678723510302","265930"],
        ["Risk of Rain","425779272842608670","248820"],
        ["BombTag","425779854332657694","791930"],
        ["Miscreated","425779909835751424","299740"],
        ["theHunter Classic","425781960317861888","253710"],
        ["Cortex Command","425787524737269770","209670"],
        ["METAL GEAR SURVIVE BETA","425800674568044575","797470"],
        ["Block N Load","426524547177512960","299360"],
        ["Lethal League","426524717919240202","261180"],
        ["Sniper Elite 4","426524936060928011","312660"],
        ["Endless Space 2","426524963583950868","392110"],
        ["Dead Maze","426524991379603458","667890"],
        ["World of Warcraft Public Test","426525131276550144"],
        ["Sniper Elite 3","426525148892495882","238090"],
        ["Magicka","426525158627606568","42910"],
        ["Street Fighter V","426525250549973022","310950"],
        ["Dead Space™","426525408666583050","17470"],
        ["Superflight","426525741702709258","732430"],
        ["The Witcher 2: Assassins of Kings Enhanced Edition","426525754092814346","20920"],
        ["Spintires","426525833281404928","263280"],
        ["Blood and Bacon","426526253294551046","434570"],
        ["Car Mechanic Simulator 2018","426526355564265479","645630"],
        ["Dragon's Dogma: Dark Arisen","426526490042302464","367500"],
        ["Project Zomboid","426526722322726912","108600"],
        ["Hero Siege","426526773694431233","269210"],
        ["POSTAL 2","426527481122521098","223470"],
        ["SNOW","426527534268809226","244930"],
        ["Real Pool 3D - Poolians","426528563919978496","670290"],
        ["Bloons TD5","426528712348139520","306020"],
        ["Deus Ex: Mankind Divided™","426529450910547968","337000"],
        ["Keep Talking and Nobody Explodes","426531471520563211","341800"],
        ["Age of Mythology: Extended Edition","427033332065370132","266840"],
        ["F1 2015","427304691903365120","286570"],
        ["Overcooked","428052640740540416","448510"],
        ["The Witcher: Enhanced Edition","428052689641930752","20900"],
        ["PickCrafter","428052738140798976","734750"],
        ["Need for Speed™ Most Wanted","428052828242706433"],
        ["Just Survive","428053249120010241","295110"],
        ["One Finger Death Punch","428053322000367616","264200"],
        ["The Elder Scrolls: Legends","428053383178354688","364470"],
        ["Pit People","428053560304074752","291860"],
        ["Magic Duels","428053651932577792","316010"],
        ["STAR WARS™ Knights of the Old Republic™ II: The Sith Lords™","428053722300416010","208580"],
        ["Tree of Savior (English Ver.)","428053768630960128","372000"],
        ["Toribash","428054001502650368","248570"],
        ["STAR WARS™ Jedi Knight: Jedi Academy™","428054061502300160","6020"],
        ["Deep Rock Galactic","428054228511227914","548430"],
        ["Stranded Deep","428054462892867614","313120"],
        ["Hunt: Showdown (Test Server)","428054629146951691","770720"],
        ["Eco","428055174905331712","382310"],
        ["Hide and Shriek","428055329004191744","480430"],
        ["APB Reloaded","428055627030331402","113400"],
        ["Call of Duty: Black Ops","428055652162732032","42700"],
        ["Prey","428055981650608128","480490"],
        ["Metro Conflict: The Origin","428056164698423296","662320"],
        ["Spelunky","428056413806395392","239350"],
        ["Medieval II: Total War","428057046701572106","4700"],
        ["Magicka 2","428057934983987200","238370"],
        ["UNO","428058887334264832","470220"],
        ["Nioh: Complete Edition","428059098882506752","485510"],
        ["Warhammer 40,000: Dawn of War III","428060042248454144","285190"],
        ["Fortnite","432980957394370572"],
        ["Unleash","437391104804126720","621940"],
        ["Estranged: The Departure","443136903814971445","582890"],
        ["Archeage","443155983670312969"],
        ["WAKFU","443155990414622730","215080"],
        ["Microsoft Flight Simulator X: Steam Edition","443156007544160276","314160"],
        ["Darwin Project","443156037130780692","544920"],
        ["Mitos.is: The Game","443156048992403456","389570"],
        ["Genital Jousting","443156066562473993","469820"],
        ["Universe Sandbox","443156067434889236","230290"],
        ["Aura Kingdom","443156075399872522","268420"],
        ["Far Cry 5","443156340454457344","552520"],
        ["The Darkness II","443156342115663882","67370"],
        ["STAR WARS™ Empire at War: Gold Pack","443156343227023370","32470"],
        ["BLOCKADE 3D","443156392874868767","302830"],
        ["MINDNIGHT","443156444351561738","667870"],
        ["Zombie Panic! Source","443156570847838218","17500"],
        ["Just Cause™ 3: Multiplayer Mod","443156876931235840","619910"],
        ["SimCity™","443157047157194772"],
        ["Frostpunk","443157248710148117","323190"],
        ["Hurtworld","443157375260688395","393420"],
        ["Modern Combat Versus","443157946357252116","723780"],
        ["Quantum Break","443158005798928384","474960"],
        ["The Jackbox Party Pack 3","443158085247303690","434170"],
        ["Tropico 5","443158178083897375","245620"],
        ["Radical Heights","443158281624617000","809960"],
        ["My Summer Car","443158342026788884","516750"],
        ["Spec Ops: The Line","443158504719646739","50300"],
        ["Friday the 13th: Killer Puzzle","443158817983692820"],
        ["Verdun","443159293538205697","242860"],
        ["World of Guns: Gun Disassembly","443159499512086539","262410"],
        ["No Man's Sky","443159611479031808","275850"],
        ["Ylands","443159628185075722","298610"],
        ["RESIDENT EVIL 7 biohazard / BIOHAZARD 7 resident evil","443160369192632330","418370"],
        ["BATTLETECH","443160562088673285"],
        ["Super Hexagon","443161212969156608","221640"],
        ["PixARK","443165450424156160","593600"],
        ["Spiral Knights","443168429990477844","99900"],
        ["Satellite Reign","443198577687134218"],
        ["Pillars of Eternity","443198850119892992","291650"],
        ["Conan Exiles","443524051999260672","440900"],
        ["TrackMania² Stadium","444200321179451412","232910"],
        ["Need for Speed™","444540143890726940"],
        ["Day of Defeat: Source","444720426934075393","300"],
        ["Dungeon of the Endless","444853958977126400","249050"],
        ["Endless Legend","445329750819602433","289130"],
        ["DEEP SPACE WAIFU","445783564257067008","639790"],
        ["Surviving Mars","445996079352250368","464920"],
        ["Dragon Age™: Inquisition","446061700496621578"],
        ["Mass Effect™: Andromeda","446061836807307301"],
        ["CrossFire","446061929283321856"],
        ["Toontown Rewritten","446062074842447909"],
        ["Survarium","446062275925770270"],
        ["Plants vs Zombies GW2","446063035057045534"],
        ["Project64","446063198198693898"],
        ["Armored Warfare","446063355594145823"],
        ["The Expendabros","446069736250277888","312990"],
        ["Mount Your Friends","446105070057029663","296470"],
        ["Project CARS 2","446380370733039616","378860"],
        ["Shakes and Fidget","447038538383622145","438040"],
        ["SAS: Zombie Assault 4","447184346252836864","678800"],
        ["Awesomenauts","447488337519968257","204300"],
        ["Yume Nikki","447509870510473216","650700"],
        ["Holdfast: Nations At War","447728433037049876","589290"],
        ["Learn to Fly 3","447743861549432833","589870"],
        ["Stories: The Path of Destinies","448044587580260363","439190"],
        ["Layers of Fear","448120144775086080","391720"],
        ["Star Trek Online","448384255131779073","9900"],
        ["Minion Masters","448417850466762753","489520"],
        ["Warhammer 40,000: Dawn of War - Soulstorm","448448339386695690","9450"],
        ["Ultimate Epic Battle Simulator","448537306345898014","616560"],
        ["TerraTech","448560544778289152","285920"],
        ["AirMech Strike","448622851386376202","206500"],
        ["Spintires: MudRunner","448910307969204236","675010"],
        ["Alien Swarm","449531408730423296","630"],
        ["Hacknet","449639683740270612","365450"],
        ["Quake Champions","449682899596214283","611500"],
        ["Iron Snout","449684687011708928","424280"],
        ["DARK SOULS™: REMASTERED","449738622619353088","570940"],
        ["Raft","449806905901056012","648800"],
        ["Dungreed","449885746799575040","753420"],
        ["Grand Theft Auto IV","450005834672373760","12210"],
        ["Synergy","450021409700446208","17520"],
        ["Wizard of Legend","450024058348634112","445980"],
        ["Kritika Online","450129940051001354","439350"],
        ["Mirror's Edge","450145899063017492","17410"],
        ["Car Mechanic Simulator 2015","450273108859813888","320300"],
        ["Double Action: Boogaloo","450292948911915008","317360"],
        ["STAR WARS™: Knights of the Old Republic™","450293931301666826","32370"],
        ["The Stanley Parable","450401603669721089","221910"],
        ["Tyranny","450668558465368074","362960"],
        ["Empyrion - Galactic Survival","450804667748843520","383120"],
        ["Bless Online","451132630390538270","681660"],
        ["60 Seconds!","451336909831012383","368360"],
        ["The Escapists","451429730416197669","298630"],
        ["Dauntless","451468933057347603"],
        ["Dragon Age: Origins - Ultimate Edition","451538960305618952","47810"],
        ["Total War Saga: Thrones of Britannia","451539017381576704","712100"],
        ["OKAMI HD / 大神 絶景版","451539083966283776","587620"],
        ["AdVenture Communist","451539129973604352","462930"],
        ["Governor of Poker 3","451539151678865409","436150"],
        ["Worms Revolution","451539172763762688","200170"],
        ["L.A. Noire","451539180682739732","110800"],
        ["The Elder Scrolls III: Morrowind","451539197044719616","22320"],
        ["Armello","451539293173841949","290340"],
        ["NBA 2K18","451539322965852185","577800"],
        ["MechWarrior Online","451539349142634496","342200"],
        ["Resident Evil 5 / Biohazard 5","451539402896703490","21690"],
        ["House Flipper","451539472610492426","613100"],
        ["Sleeping Dogs: Definitive Edition","451539490574434315","307690"],
        ["FINAL FANTASY VII","451539606207463424","39140"],
        ["Heroes of Hammerwatch","451539639811964928","677120"],
        ["Youtubers Life","451539649656127488","428690"],
        ["resident evil 4 / biohazard 4","451539772037398560","254700"],
        ["State of Decay: Year-One","451539805860528128","329430"],
        ["Argo","451539926417408000","530700"],
        ["ESEA","451539971283877888","479130"],
        ["Zombie Army Trilogy","451539976908439552","301640"],
        ["Call of Duty: Modern Warfare 3","451539986144296969","42680"],
        ["Horizon Source","451540115437912064","788880"],
        ["Yet Another Zombie Defense","451540166037995532","270550"],
        ["CPUCores :: Maximize Your FPS","451540177131798541","384300"],
        ["Wargame: Red Dragon","451540284006858772","251060"],
        ["Resident Evil 6 / Biohazard 6","451540292458512394","221040"],
        ["CastleMiner Z","451540363941904385","253430"],
        ["The Lord of the Rings Online™","451540469470593024"],
        ["For The King","451540626270584833","527230"],
        ["Just Cause 2","451540656494477312","8190"],
        ["Gigantic","451540746592321536","327690"],
        ["Dawn of War II - Retribution","451540774530711572"],
        ["Paint the Town Red","451540782785101834","337320"],
        ["Black Mesa","451540911172747284","362890"],
        ["Vindictus","451541058497675294","212160"],
        ["Batman: Arkham City GOTY","451541064545861632","200260"],
        ["Night in the Woods","451541089912881162","481510"],
        ["Door Kickers","451541104643538944","248610"],
        ["WARMODE","451541174877159430","391460"],
        ["Sniper Ghost Warrior 2","451541277935140874","34870"],
        ["Battlefield: Bad Company 2","451541573742755850","24960"],
        ["LIMBO","451541581778911262","48000"],
        ["HELLDIVERS™","451541695771967508","394510"],
        ["Teeworlds","451541853418815498","380840"],
        ["Moonbase Alpha","451541936872882186","39000"],
        ["McOsu","451541958268157952","607260"],
        ["Loading Screen Simulator","451542208257064961","652980"],
        ["STAR WARS™ Republic Commando","451542291635503124","6000"],
        ["The Lab","451542394857455638","450390"],
        ["Citra","451542523219935272"],
        ["Sword Art Online: Fatal Bullet","451542793513598996","626690"],
        ["Bit Heroes","451542845703061524","666860"],
        ["Orcs Must Die! 2","451543160057888778","201790"],
        ["DC Universe Online","451543277385023488","24200"],
        ["GUILTY GEAR Xrd -REVELATOR-","451543838847139850","520440"],
        ["Battle Royale Trainer","451543838989746186","772540"],
        ["Rise of Nations: Extended Edition","451543839665160232","287450"],
        ["The Jackbox Party Pack 2","451543877111775247","397460"],
        ["Aion","451543892358201393"],
        ["Alien: Isolation","451543893050261504","214490"],
        ["Sins of a Solar Empire: Rebellion","451543958611427328","204880"],
        ["DRAGON BALL XENOVERSE","451543960167514112","323470"],
        ["Supreme Commander: Forged Alliance","451543961207701534","9420"],
        ["Spellsworn","451544008737423360","360620"],
        ["Mass Effect™ 3","451544148617592832"],
        ["SUPERHOT VR","451544150756556810","617830"],
        ["Black Desert Online SA","451544197632229376","706220"],
        ["Grand Theft Auto: Vice City","451544294432702474","12110"],
        ["Digimon Masters Online","451544305509859328","537180"],
        ["Mirror's Edge™ Catalyst","451544331287789568"],
        ["ANNO 2070","451544339416481828"],
        ["Life is Feudal: MMO","451544345699549194","700030"],
        ["Faeria","451544379908423680","397060"],
        ["Everlasting Summer","451544422711033856","331470"],
        ["Dark and Light","451544430025900062","529180"],
        ["Steel Division: Normandy 44","451544463941304350","572410"],
        ["Amnesia: A Machine for Pigs","451544639674253322","239200"],
        ["RWBY: Grimm Eclipse","451544645852332032","418340"],
        ["DmC Devil May Cry","451544650009018368","220440"],
        ["Supreme Commander 2","451544676458037258","40100"],
        ["Deus Ex: Human Revolution - Director's Cut","451544688713793536","238010"],
        ["FreeStyle 2: Street Basketball","451544694267183104","339610"],
        ["Furi","451544694598533120","423230"],
        ["Ultra Street Fighter IV","451544694917169162","45760"],
        ["RIFT","451544729763446784","39120"],
        ["OneShot","451544770876145664","420530"],
        ["High Octane Drift","451544776895103006","457330"],
        ["RUINER","451544819555237888","464060"],
        ["PHANTASY STAR ONLINE 2","451544889331679242"],
        ["Sword With Sauce: Alpha","451544945984012288","581630"],
        ["Mass Effect™","451544965542182942","17460"],
        ["Turmoil","451545009938759710","361280"],
        ["Worms Armageddon","451545039139766272","217200"],
        ["Pillars of Eternity II: Deadfire","451545069326041099","560130"],
        ["PC Building Simulator","451545070739652608","621060"],
        ["Streets of Rogue","451545147361067008","512900"],
        ["Hitman: Absolution","451545240264769547","203140"],
        ["Football Manager 2017","451545279154487306","482730"],
        ["Atlas Reactor","451545283784998934","402570"],
        ["Max Payne 3","451545305201246208","204100"],
        ["S.T.A.L.K.E.R.: Shadow of Chernobyl","451545336218124289","4500"],
        ["Rec Room","451545342987468800","471710"],
        ["My Time At Portia","451545373740367881","666140"],
        ["Lost Castle","451545409253408768","434650"],
        ["Soda Dungeon","451545721036996619","564710"],
        ["Fallout 3","451545729253638144","22370"],
        ["RUNNING WITH RIFLES","451545786946289664","270150"],
        ["Emily is Away","451545806806319104","417860"],
        ["Tactical Monsters Rumble Arena","451545859830710272","705220"],
        ["PAYDAY: The Heist","451546040382914567","24240"],
        ["Brick Rigs","451546081243824131","552100"],
        ["Star Conflict","451546138999390208","212070"],
        ["AdventureQuest 3D","451546156024201217","429790"],
        ["Bayonetta","451546169685049344","460790"],
        ["Boring Man - Online Tactical Stickman Combat","451546227696205844","346120"],
        ["Mass Effect™ 2","451546229252554752"],
        ["Shadow Warrior 2","451546331639709706","324800"],
        ["DARK SOULS™ II","451546403764830218","236430"],
        ["Empire: Total War","451546468763959326","10500"],
        ["Burnout Paradise: The Ultimate Box","451546473801187348","24740"],
        ["Supraball","451546491866316800","321400"],
        ["Desolate","451546514775474195","671510"],
        ["Arma 2: Operation Arrowhead","451546514943377438","33930"],
        ["MU Legend","451546558706614292"],
        ["House Party","451546699177918464","611790"],
        ["Relic Hunters Zero","451546725606359050","382490"],
        ["EverQuest","451546783668109322"],
        ["WildStar","451546896167731220"],
        ["Spooky's Jump Scare Mansion","451546955513069594","356670"],
        ["S.T.A.L.K.E.R.: Call of Pripyat","451547035104051200","41700"],
        ["Forts","451547094121971712","410900"],
        ["Heroes of Newerth","451547098916192284"],
        ["Osiris: New Dawn","451547204340023296","402710"],
        ["Shadow Warrior","451547262418419712","233130"],
        ["America's Army: Proving Grounds","451547323596537866","203290"],
        ["AION Free-to-Play","451547384975982602","261430"],
        ["Stronghold Crusader 2","451547401594077184","232890"],
        ["Owlboy","451547470967865345","115800"],
        ["Reigns","451547889982898176","474750"],
        ["Zula Online","451547924531249152","714210"],
        ["Tales of Berseria","451548231223214080","429660"],
        ["Shooty Skies","451548290740387850","702810"],
        ["HunieCam Studio","451548751010725888","426000"],
        ["Bomber Crew","451548752046587915","537800"],
        ["Line of Sight","451548957361831946","436520"],
        ["S.K.I.L.L. - Special Force 2","451549001511075860","286940"],
        ["Mini Metro","451549165361823769","287980"],
        ["ORION: Prelude","451549177885753345","104900"],
        ["Tricky Towers","451549293946470400","437920"],
        ["Surgeon Simulator","451549334320971776","233720"],
        ["The Jackbox Party Pack 4","451549336996806676","610180"],
        ["Contagion","451549440734658560","238430"],
        ["SimplePlanes","451549534993252362","397340"],
        ["RPG Maker MV","451549964422873088","363890"],
        ["FEZ","451550717673472030","224760"],
        ["Five Nights at Freddy's","451550771193053194","319510"],
        ["Injustice™ 2","451551201604141056","627270"],
        ["Eternal Card Game","451551225968853012","531640"],
        ["CarX Drift Racing Online","451551359393595412","635260"],
        ["The Evil Within 2","451551873581711360","601430"],
        ["Death Road to Canada","451551950937260032","252610"],
        ["Totally Accurate Battle Zombielator","451551980108906496","615000"],
        ["Mount & Blade: With Fire and Sword","451552014883880980","48720"],
        ["Secret World Legends","451552107825201152","215280"],
        ["Victoria II","451552374423552000","42960"],
        ["Call to Arms","451552458083270676","302670"],
        ["Mirror","451552550446170113","644560"],
        ["LEGO® Star Wars™: The Complete Saga","451552771045457920","32440"],
        ["Just Fishing","451553376803487744","703950"],
        ["Domina","451553701404999700","535230"],
        ["Quake Live","451553710275821568","282440"],
        ["Orcs Must Die!","451554260262322176","427270"],
        ["Loadout","451555691836997643","208090"],
        ["Farming Simulator 15","451556128992657418","313160"],
        ["Rome: Total War","451557091279372298","4760"],
        ["Fallout 4 VR","451557388504530945","611660"],
        ["Magicite","451559209893363712","268750"],
        ["Bully: Scholarship Edition","451560105008431124","12200"],
        ["Nidhogg","451561653570502656","94400"],
        ["Black Survival","451561708461359124","690510"],
        ["FORTIFY","451563408794320906","505040"],
        ["Avorion","451563448015519744","445220"],
        ["Serious Sam 3: BFE","451564621422395392","41070"],
        ["Gold Rush: The Game","451564928868941824","451340"],
        ["The Red Solstice","451565617162747904","265590"],
        ["Ni no Kuni™ II: Revenant Kingdom","451572281584648202","589360"],
        ["Rock of Ages 2","451584845898842112","434460"],
        ["Skyforge","451598719498846218","414530"],
        ["Meteor 60 Seconds!","451604801248034836","788770"],
        ["Yu-Gi-Oh! Legacy of the Duelist","451686854597672970","480650"],
        ["Beat Saber","451991967149195264","620980"],
        ["SpellForce 3","452001740431163402","311290"],
        ["Titan Quest Anniversary Edition","452029545843785730","475150"],
        ["SEGA Mega Drive & Genesis Classics","452099265230274571","34270"],
        ["PUBG: Test Server","452140668265955339","622590"],
        ["Overgrowth","452205639347994656","25000"],
        ["Dream Daddy: A Dad Dating Simulator","452206598283198504","654880"],
        ["Kingdoms of Amalur: Reckoning™","452276290385346589","102500"],
        ["Star Citizen","452295596917784577"],
        ["Need for Speed: Hot Pursuit","452295877978095646","47870"],
        ["Battlefield™ Hardline","452296074762256393"],
        ["World of Warplanes","452296290940878848"],
        ["Train Simulator","452313101539475456","24010"],
        ["Tiger Knight","452944801952694282","415660"],
        ["Ball 3D: Soccer Online","453374517864169477","485610"],
        ["Passpartout: The Starving Artist","453677781511831572","582550"],
        ["Monster Prom","453680460304875531","743450"],
        ["Totally Accurate Battlegrounds","453818237508124692","823130"],
        ["Vampyr","454123972343365652","427290"],
        ["Outlast 2","454411001492668417","414700"],
        ["Portal Knights","454600052904820736","374040"],
        ["Fortified","454713992322220032","334210"],
        ["TOXIKK","454731115027103759","324810"],
        ["Battle Carnival","454759028187463700","803140"],
        ["iRacing","454810317705314334"],
        ["FarCry 4","454811906230845440"],
        ["Celeste","454814894596816907","504230"],
        ["Audiosurf","455442346558095370","12900"],
        ["Baldur's Gate: Enhanced Edition","455494486089269258","228280"],
        ["Sid Meier's Civilization III: Complete","455584343792943104","3910"],
        ["Warhammer 40,000: Inquisitor - Martyr","455692385268269056","527430"],
        ["MONMUSU","455713051794997249","533540"],
        ["Little Nightmares","455788266860445696","424840"],
        ["RollerCoaster Tycoon: Deluxe","455864514185920523","285310"],
        ["Halo Wars: Definitive Edition","456022848214138884","459220"],
        ["Jurassic World Evolution","456144990930862086","648350"],
        ["Defiance","456294192616964096","224600"],
        ["Thief","456834047730122752","239160"],
        ["From The Depths","456965807780397076","268650"],
        ["A Story About My Uncle","457095132119040020","278360"],
        ["Moonlighter","457269337137348613","606150"],
        ["Pirate101","457283942475759662"],
        ["Dreadnought","457284340330659864"],
        ["Napoleon: Total War","457284624977100800"],
        ["Alliance of Valiant Arms","457284796658352128"],
        ["Arpiel Online","457299794772230154"],
        ["ManiaPlanet","457300140470960128"],
        ["마비노기 영웅전","457300488199733265"],
        ["Lineage II","457300834393391104"],
        ["MapleStory 2","457301027453009947"],
        ["PPSSPP","457301373592141836"],
        ["Command & Conquer™: Generals and Zero Hour","457301510515195924"],
        ["NoxPlayer","457301824110723113"],
        ["Tribes: Ascend","457549567538495489","17080"],
        ["Medieval Engineers","457619737535447060","333950"],
        ["Cuisine Royale","457888043668340737","884660"],
        ["Witch It","458081878394667009","559650"],
        ["GRID 2","458309189974884363","44350"],
        ["Mark of the Ninja","458503484153528322","214560"],
        ["Nomad","458780333601587200","378370"],
        ["GORN","459465853600268289","578620"],
        ["Unreal Gold","459581070438825994","13250"],
        ["Shadowrun Returns","459713656339562503","234650"],
        ["Space Hulk: Deathwing - Enhanced Edition","459764260935958538","816090"],
        ["Colony Survival","459774120226455562","366090"],
        ["Murder Miners","459807786151182346","274900"],
        ["GOD EATER 2 Rage Burst","459968630935781376","438490"],
        ["Aimtastic","460092747580309504","757240"],
        ["Tom Clancy's The Division Trial","460199128522293258","588220"],
        ["Call of Duty: Infinite Warfare","460217112250810368","292730"],
        ["Transistor","460299285049901056","237930"],
        ["LEGO® MARVEL Super Heroes","460450424940396544","249130"],
        ["Salt and Sanctuary","460472377566822400","283640"],
        ["Transport Fever","460542812124086272","446800"],
        ["EARTH DEFENSE FORCE 4.1  The Shadow of New Despair","460598317173309452","410320"],
        ["The Crew 2","460639482547273749","760760"],
        ["Titan Souls","460691329752629248","297130"],
        ["METAL GEAR RISING: REVENGEANCE","460788999880179722","235460"],
        ["Next Day: Survival","460831278799912960","519190"],
        ["Robot Roller-Derby Disco Dodgeball","460909130140614656","270450"],
        ["King of the Hat","460940655984771072"],
        ["Life is Feudal: Your Own","460951106357297172","290080"],
        ["Blood Bowl 2","460987469756629005","236690"],
        ["Poker Night 2","461039002796032000","234710"],
        ["Five Nights at Freddy's 2","461050695198572554","332800"],
        ["The Awesome Adventures of Captain Spirit","461256067003973633","845070"],
        ["Freeman: Guerrilla Warfare","461302775284891648","773951"],
        ["Hammerwatch","461404096751206420","239070"],
        ["RollerCoaster Tycoon 3: Platinum!","461439083894407178","2700"],
        ["Jalopy","461561181598121984","446020"],
        ["Ultimate Custom Night","461673633798946816","871720"],
        ["Fable Anniversary","461711977727918080","288470"],
        ["Pavlov VR","461758710088466432","555160"],
        ["Styx: Shards of Darkness","462296460512198656","355790"],
        ["Audiosurf 2","462407650941075456","235800"],
        ["Slap City","462788623675162634","725480"],
        ["Natural Selection 2","462817604202004480","4920"],
        ["To the Moon","462829880615370762","206440"],
        ["Devil May Cry® 4 Special Edition","463227448167890944","329050"],
        ["The Evil Within","463274972958425098","268050"],
        ["Lords Of The Fallen","463425384893906944","265300"],
        ["Five Nights at Freddy's: Sister Location","463603236880908297","506610"],
        ["fin-dev","463761561685721088","640590"],
        ["The Jackbox Party Pack","463963734507782144","331670"],
        ["NEKOPARA Vol. 1","464273275904589834","333600"],
        ["Grand Theft Auto III","464434670646460427","12100"],
        ["Worlds Adrift","464507152111763457","322780"],
        ["We Were Here Too","464823241098395674","677160"],
        ["Farm Together","464830344558805002","673950"],
        ["Vampire: The Masquerade - Bloodlines","464956888656773150","2600"],
        ["Stoneshard: Prologue","465087252574371850","869760"],
        ["Cook, Serve, Delicious! 2!!","465247704155553792","386620"],
        ["Warhammer 40,000: Dawn of War - Dark Crusade","465536900560584714","4580"],
        ["FINAL FANTASY X/X-2 HD Remaster","465985864095367178","359870"],
        ["Longshot [Dev]","466240509682384896"],
        ["Heavy Metal Machines","466296927944835082","331360"],
        ["SOS","466334957183303710","619080"],
        ["Wreckfest","466457842401148948","228380"],
        ["Card Hunter","466640524670009354","293260"],
        ["Gear Up","466685661806592000","214420"],
        ["Amorous","466691613138354196","778700"],
        ["Pixel Worlds","466733503720062996","636040"],
        ["Starbound","467102538278109224","211820"],
        ["Montaro","467286012104671232","495890"],
        ["LawBreakers","467724362674470912","350280"],
        ["Hot Dogs, Horseshoes & Hand Grenades","467788345565511690","450540"],
        ["RollerCoaster Tycoon 2: Triple Thrill Pack","467979045179752448","285330"],
        ["Crash Bandicoot™ N. Sane Trilogy","468099355962900480","731490"],
        ["Islands of Nyne: Battle Royale","468254179987685406","728540"],
        ["Rules Of Survival","468577647392456714","788260"],
        ["Age of Wonders III","468606521433915404","226840"],
        ["SINNER","468611186330566677"],
        ["S.T.A.L.K.E.R.: Clear Sky","469153997027016714","20510"],
        ["Russian Fishing 4","469213224215248896","766570"],
        ["Omensight","469278650936721428","455820"],
        ["Sundered","469280323109257228","535480"],
        ["Project Highrise","469288321814757402","423580"],
        ["Crookz - The Big Heist","469288750019641365","310490"],
        ["System Shock: Enhanced Edition","469292352893222942","410710"],
        ["The Metronomicon: Slay The Dance Floor","469292858701119508","416790"],
        ["Dungeons 2","469293209214910504","262280"],
        ["Tropico 4","469293612207833089","57690"],
        ["Red Faction Guerrilla Re-Mars-tered","469429746007015426","667720"],
        ["Hellbound: Survival Mode","469564278853206025","802200"],
        ["MAD MACHINES","469807750084296716","611260"],
        ["METAL GEAR SOLID V: GROUND ZEROES","469944923928657939","311340"],
        ["Bloody Trapland","469959314183028736","257750"],
        ["Worm.is: The Game","469989584277602304","466910"],
        ["Cossacks 3","470220034237530112","333420"],
        ["Guild Wars","470282452674412564"],
        ["The Sims 2: Ultimate Collection","470283475660963850"],
        ["Dragon Age: Origins","470283661414105131"],
        ["Project Rhombus","470399665154686986","735570"],
        ["Climb","470810047547572244","876900"],
        ["Command and Conquer: Red Alert 3","470958640031989761","17480"],
        ["Clone Drone in the Danger Zone","471192232985231370","597170"],
        ["This Is the Police 2","471357631697780774","785740"],
        ["Darksiders III","471358881348452352","606280"],
        ["Dead Rising 3","471760010016194570","265550"],
        ["Dino D-Day","472197780836974604","70000"],
        ["Banner Saga 3","472228397020479488"],
        ["War Robots","472823716062167050","767560"],
        ["MOBIUS FINAL FANTASY","472837297063067658","536930"],
        ["Democracy 3","473064732807528458","245470"],
        ["Poker Night at the Inventory","473440891110162440","31280"],
        ["Momodora: Reverie Under the Moonlight","473594880673972224","428550"],
        ["Arizona Sunshine","473969782085910558","342180"],
        ["de Blob","474014437863587870","532320"],
        ["de Blob 2","474015113964290048","563190"],
        ["Kenshi","474081029490081792","233860"],
        ["140","474298936228708372","242820"],
        ["RaceRoom Racing Experience","474431535291039754","211500"],
        ["Stronghold Crusader HD","474975575409295380","40970"],
        ["Sniper Ghost Warrior 3","475006595814785024","368070"],
        ["Motorsport Manager","475034058066493441","415200"],
        ["Beholder","475039384358617098","475550"],
        ["BlazBlue Cross Tag Battle","475495343182577675","702890"],
        ["Warhammer 40,000: Dawn of War - Game of the Year Edition","475821838782693387","4570"],
        ["Feed and Grow: Fish","475913332478443530","429050"],
        ["Punch Club","476271278836285440","394310"],
        ["Half dead","476349443474718730","434730"],
        ["Worms W.M.D","476482983675559946","327030"],
        ["Pyre","476907979069849620","462770"],
        ["MONSTER HUNTER: WORLD","477152881196269569","582010"],
        ["Among Us","477175586805252107","945360"],
        ["Viridi","477520549833211915","375950"],
        ["Offworld Trading Company","477657966095630346","271240"],
        ["West of Loathing","478014121065840650","597220"],
        ["The Ultimate DOOM","478613204323270666","2280"],
        ["Last Year: The Nightmare","478637764565401630"],
        ["Rampage Knights","478646014841061416","314410"],
        ["Yakuza 0","478764846951825418","638970"],
        ["Rend","478866361544605698","547860"],
        ["Overcooked! 2","479169486583496704","728880"],
        ["Fallout 2","479334869462417409","38410"],
        ["DEATHGARDEN","479694330441891840","555440"],
        ["RAGE","479735703140433940","9200"],
        ["Orwell","479821376975405066","491950"],
        ["Time Clickers","479894252726517760","385770"],
        ["Prominence Poker","480167738334248980","384180"],
        ["Wrecked","480316289307639808","805850"],
        ["Paintball War","480363777574043658","757130"],
        ["Post Scriptum","480560735521341440","736220"],
        ["Crawl","480573996509954078","293780"],
        ["Danganronpa: Trigger Happy Havoc","480963716934795264","413410"],
        ["911 Operator","481103865559908372","503560"],
        ["How to Survive 2","481505570747318292","360170"],
        ["Dead Rising 2","481570202988052490","45740"],
        ["Graveyard Keeper","481816401183506432","599140"],
        ["Shower With Your Dad Simulator 2015: Do You Still Shower With Your Dad","481999402630774794","359050"],
        ["Valkyria Chronicles™","482176854938353674","294860"],
        ["Hot Lava","482730443037212673","382560"],
        ["SimCity 4 Deluxe","482776230895288320","24780"],
        ["BROKE PROTOCOL: Online City RPG","483247042689368084","696370"],
        ["We Need to Go Deeper","483361121269710858","307110"],
        ["Roguelands","483421234391154698","364420"],
        ["UNO Demo","484310169145180160","471610"],
        ["SCUM","484425151631589378","513710"],
        ["The Witcher Enhanced Edition Director's Cut","484451241825533962"],
        ["STAR WARS Rebellion","484475041711521830"],
        ["Call of War","484486787952148485","672680"],
        ["Battle for Wesnoth","484526083686006810","599390"],
        ["LISA","484572816977428490","335670"],
        ["Warhammer 40,000: Space Marine","484789228761514004","55150"],
        ["Insurgency: Sandstorm","484892481452769290","581320"],
        ["Onward","484938446268268564","496240"],
        ["Two Point Hospital","485224436187004928","535930"],
        ["Talisman: Digital Edition","485857105278926848","247000"],
        ["Gunpoint","486705198576828416","206190"],
        ["Call of Duty 4: Modern Warfare","486763816944795658","7940"],
        ["Dead Frontier 2","487074862565818378","744900"],
        ["Stronghold Crusader Extreme HD","487328146438356992","16700"],
        ["Throne of Lies","487330866830376960","595280"],
        ["Bad North","487564993236172802","688420"],
        ["Hunger Dungeon","487652330989158410","513560"],
        ["The Dig®","487683851519393822","6040"],
        ["Deus Ex: Game of the Year Edition","488014835389300736","6910"],
        ["Galactic Civilizations II: Ultimate Edition","488380884337295360","202200"],
        ["Stick Fight: The Game","488693576314650634","674940"],
        ["Sid Meier's Civilization® IV Complete","488844250251788339","3900"],
        ["XCOM Enemy Unknown","488856269382483979","200510"],
        ["Dungeon Defenders","488858705836900355","65800"],
        ["NBA 2K17","489276682566369290","385760"],
        ["Hyperdimension Neptunia Re;Birth1","489332841910632458","282900"],
        ["sZone-Online","489441787778301992","316390"],
        ["Resident Evil Revelations 2 / Biohazard Revelations 2","489648352892289054","287290"],
        ["Trine Enchanted Edition","489705172453425173","35700"],
        ["Trine 3: The Artifacts of Power","489715273683697674","319910"],
        ["Trine 2: Complete Story","489715841789853697","35720"],
        ["Job Simulator","489832887936483338","448280"],
        ["FIFA 16","489854965787918376"],
        ["Construction-Simulator 2015","489879126925115392","289950"],
        ["Seasons After Fall","489916817146511371"],
        ["Wasteland 2: Director's Cut","489917055282315274","404730"],
        ["Shadows: Heretic Kingdoms","489917480274362368"],
        ["System Shock 2","489917602412494878","238210"],
        ["Shadow of the Tomb Raider","490260586899177491","750920"],
        ["ONRAID","490611188988772367","511800"],
        ["Call of Duty Black Ops 4","490913233667096576"],
        ["Simply Chess","491048607072387072","312280"],
        ["Chaos Reborn","491200852149796865","319050"],
        ["Broken Age","491424584168505354","232790"],
        ["Dangerous Waters","491425013468102657","1600"],
        ["Disciples II: Gallean's Return","491425405681664037","1640"],
        ["Disciples Sacred Lands Gold","491425800059486208","281450"],
        ["FlatOut 2","491426078137647104","2990"],
        ["FlatOut: Ultimate Carnage","491426256789831690","12360"],
        ["Fleet Command","491426408384561160","2910"],
        ["Space Empires IV Deluxe","491426627394338846","1610"],
        ["Sub Command","491426844604760120","2920"],
        ["Masters of Anima","491427069734027273"],
        ["Pony Island","491427187442974749","405640"],
        ["VVVVVV","491427544134975498","70300"],
        ["Guacamelee! Super Turbo Championship Edition","491427940135993364","275390"],
        ["The End Is Nigh","491739802870349883","583470"],
        ["TowerFall Ascension","491740193116782595","251470"],
        ["DRAGON QUEST® XI: Echoes of an Elusive Age™","491806530576842762","742120"],
        ["Regular Human Basketball","491853507507388427","661940"],
        ["F1 2018","491909189086740480","737800"],
        ["Never Split the Party","492054902772727808","711810"],
        ["The Wolf Among Us","492110850342125591","250320"],
        ["Brothers - A Tale of Two Sons","492112259770875921","225080"],
        ["ABZU","492113873508368403","384190"],
        ["Last Day of June","492114663211925536","635320"],
        ["Cities in Motion","492115461824184320","73010"],
        ["Darkest Hour: A Hearts of Iron Game","492116330909138974","73170"],
        ["Europa Universalis III","492117546728816640","25800"],
        ["Hearts of Iron III","492118503508279316","25890"],
        ["Majesty Gold HD","492120134937346049","73230"],
        ["Shadowrun: Dragonfall - Director's Cut","492120767111233566","300550"],
        ["Torchlight","492121941155643402","41500"],
        ["STAR WARS™ Republic Commando™","492129256772599837"],
        ["Oddworld: Stranger's Wrath","492129658536591400","15750"],
        ["Vegas: Make It Big","492130126012743710","6210"],
        ["STAR WARS™ Galactic Battlegrounds Saga","492131222135373834","356500"],
        ["The Walking Dead: The Final Season","492133608493023232","866800"],
        ["STAR WARS™ Jedi Knight: Dark Forces II","492134139647098881","32380"],
        ["Yooka-Laylee","492134695711014912","360830"],
        ["The Secret of Monkey Island™ Special Edition","492134756914429975","32360"],
        ["STAR WARS™ Jedi Knight II: Jedi Outcast™","492135944179286068","6030"],
        ["STAR WARS™ Knights of the Old Republic","492136872714305566","32370"],
        ["Star Wars: Dark Forces","492137508633706517","32400"],
        ["Ascension: Deckbuilding Game","492140628717731846","261860"],
        ["Ashes of the Singularity: Escalation","492141568816447488","507490"],
        ["Ticket to Ride","492142885077123082","108200"],
        ["Killer Queen Black","492144146040094722","663670"],
        ["Oddworld: New 'n' Tasty","492146632511586313","314660"],
        ["Out of the Park Baseball 18","492147626872012800","465650"],
        ["Tropico 3","492154985627385886","23490"],
        ["Hearts of Iron II","492158597673910281","22130"],
        ["Europa Universalis II","492159419837186053"],
        ["Ring of Elysium","492159553966702592","755790"],
        ["Victoria I","492161312730775553"],
        ["Indiana Jones® and the Fate of Atlantis™","492162663976140810","6010"],
        ["Monkey Island™ 2 Special Edition: LeChuck's Revenge™","492164341840347156","32460"],
        ["Euro Truck Simulator","492695172967301120","232010"],
        ["Galactic Civilizations III","492772865175715850"],
        ["The Culling","493430961313415188","437220"],
        ["RPG Maker VX Ace","493490198580035604","220700"],
        ["The Wild Eight","493827668991803402","526160"],
        ["Warframe Test","494178385807933445"],
        ["Planetbase","494228479898812416","403190"],
        ["Aliens vs. Predator","494240845378355220","10680"],
        ["BlazBlue Centralfiction","494341815940415488","586140"],
        ["Blacklight: Retribution","495079795252527104","209870"],
        ["20XX","495310509382565890","322110"],
        ["Warhammer 40,000: Dawn of War II - Retribution","495651148242616330","56400"],
        ["Legion TD 2","495691276159549460","469600"],
        ["Coloring Pixels","495871643432910848","897330"],
        ["Art of War: Red Tides","495889089703444481","558100"],
        ["Battlerite Royale","495912170190667776","879160"],
        ["Rogue Legacy","495979053371752481","241600"],
        ["Mist Survival","496035345981243395","914620"],
        ["A Kiss For The Petals - Remembering How We Met","496521775161671734","397270"],
        ["A Sky Full of Stars","496523213778583553","745960"],
        ["A Study in Steampunk: Choice by Gaslight","496524367962832918","421630"],
        ["Action Henk","496524555360403476","285820"],
        ["Aeon Rivals","496524827050508316"],
        ["Age of Conan","496525141467987991"],
        ["AI War: Fleet Command","496525786468319232","40400"],
        ["Alan Wake's American Nightmare","496526142673649724","202750"],
        ["Albion Online","496526645671231488","761890"],
        ["Alien Breed 2: Assault","496527138141503538","22650"],
        ["Altitude","496529186064826368","41300"],
        ["Anarchy Online","496529322039836681","396280"],
        ["ANNO 1404","496530041895911429","33250"],
        ["Anno 2205","496530253905264659","375910"],
        ["Antichamber","496532716099993623","219890"],
        ["Ascent - The Space Game","496533328833544227","345010"],
        ["Assault Android Cactus","496533560228970514","250110"],
        ["Astebreed","496533728932134922","283680"],
        ["Axiom Verge","496534151642742804","332200"],
        ["Bad Rats","496534375740080128","34900"],
        ["Bare Metal","496534611250118656","674130"],
        ["Battle Squares","496534796424708124","681990"],
        ["Battlefield 2","496534962200248373","24860"],
        ["Battlefield 2142","496535501465976835"],
        ["Beat Hazard","496535788427935764","49600"],
        ["Bejeweled 3","496536236769542154","78000"],
        ["Bejeweled Blitz","496537107708248064"],
        ["Blake Stone: Planet Strike","496538565451317259","358310"],
        ["Block Sport","496538914673262596","611260"],
        ["Blockland","496539095888035861","250340"],
        ["Bloodline Champions","496539230026334208","6370"],
        ["Boid","496539411308216320","314010"],
        ["Braid","496540068442537984","26800"],
        ["Bulletstorm","496540681913892864","99810"],
        ["C9","496543199209193488","212390"],
        ["CABAL Online","496544716997918750","253490"],
        ["Call of Duty 2","496546499346432010","2630"],
        ["Call of Juarez","496547399599390730","3020"],
        ["Cargo Commander","496547754680647690","220460"],
        ["Chronicon","496548575061213184","375480"],
        ["CLANNAD","496550410685906954","324160"],
        ["CLANNAD Side Stories","496550790572277770","420100"],
        ["Clive Barker's Undying","496552265977692181"],
        ["Clonk Rage","496552591111618565"],
        ["Cloudbuilt","496552729141837824","262390"],
        ["Combat Arms","496553014220554270"],
        ["Command and Conquer 3: Kane's Wrath","496557233979654154","24810"],
        ["Company of Heroes","496557687560077322","228200"],
        ["Cook, Serve, Delicious!","496558661041127444","247020"],
        ["Creation Kit","496560355615703060","202480"],
        ["Creeper World 3: Arc Eternal","496560583521468426","280220"],
        ["Crimsonland","496561007888433152","262830"],
        ["Crowfall","496561718668034078"],
        ["CRYPTARK","496562135447502882","344740"],
        ["Crysis","496562734889041930","17300"],
        ["Crysis 2","496564403345424431","99830"],
        ["Crysis 3","496565168528949249"],
        ["Cyphers","496565866721443840"],
        ["DarkStar One","496566320213655552","12330"],
        ["DCS World","496568071713062928","223750"],
        ["Dead Space 2","496568659276201984","47780"],
        ["DeadCore","496569001405841439","284460"],
        ["Deathsmiles","496569185237860359","314180"],
        ["Debugger 3.16: Hack'n'Run","496569333665759232","339720"],
        ["Defense Grid 2","496569474670133258","221540"],
        ["Depression Quest","496569655679385603","270170"],
        ["Devil Daggers","496571420579463168","422970"],
        ["Devilian","496571728089317437","407510"],
        ["Diablo","496571953147150354"],
        ["Diablo II","496572658255790080"],
        ["Diadra Empty","496573404002910227","284220"],
        ["DiRT 3","496574120436432915","44320"],
        ["Distance","496575580070871040","233610"],
        ["Dominions 4","496575805413916683","259060"],
        ["DOOM 3","496575943431946250","9050"],
        ["Double Dragon Neon","496576235934187539","252350"],
        ["Downwell","496576457082929152","360740"],
        ["Dragon Age II","496576882540806154","47900"],
        ["Dragon Fin Soup","496577154683895827","299600"],
        ["Dragon Nest","496577285466357760","11610"],
        ["Dragon's Dogma Online","496578773647622187"],
        ["Dropzone","496578915263971358","572520"],
        ["Duke Nukem Forever","496579092418658363","57900"],
        ["Dungeon Fighter Online","496579303631486976","495910"],
        ["Dungeonland","496579621693816832","218130"],
        ["Dungeons & Dragons Online®","496579889063919616","206480"],
        ["Dust: An Elysian Tail","496580906916511764","236090"],
        ["Dustforce","496581169639587850","65300"],
        ["Entropia Universe","496581460438941716"],
        ["EverQuest II","496582384863412249","201230"],
        ["Evoland 2","496583339986387004","359310"],
        ["Evolve","496739105481293869","273350"],
        ["Fairy Fencer F","496739512446091284","347830"],
        ["FIFA 15","496740139633213490"],
        ["Final Fantasy III","496740365072728064","239120"],
        ["FINAL FANTASY V","496740745085059112","382890"],
        ["FINAL FANTASY VI","496742764344639488","382900"],
        ["FINAL FANTASY VIII","496757203596869652","39150"],
        ["FINAL FANTASY XIII","496757542479724554","292120"],
        ["FINAL FANTASY XIII-2","496757852069822504","292140"],
        ["Firefall","496758262797172736","227700"],
        ["Flamebreak","496758379583242291","399640"],
        ["Flyff","496758691064709120"],
        ["Football Manager 2014","496758937039929370","231670"],
        ["Football Manager 2016","496760317875978256","378120"],
        ["Forza Horizon 3","496760939052269583"],
        ["Forza Motorsport 7","496761344603979796"],
        ["Fran Bow","496761451738955804","362680"],
        ["Free to Play","496761815548559360","245550"],
        ["Freedom Planet","496761999708127232","248310"],
        ["Frontier","496762504291155998","439950"],
        ["Furcadia","496763066889797674"],
        ["Gears of War 4","496763396558159892"],
        ["Granado Espada","496771607386259456","319730"],
        ["GRAV","496771913280913424","332500"],
        ["Grey Goo","496772084379418637","290790"],
        ["scram","496772185864667146","773920"],
        ["Groove Coaster","496772271088730112","744060"],
        ["Grow Home","496772402219319316","323320"],
        ["Guardians of Ember","496772734744002580","463680"],
        ["GUILTY GEAR XX ACCENT CORE PLUS R","496773998517026816","348550"],
        ["Guitar Hero World Tour","496774309042192384"],
        ["Halo Custom Edition","496775885249314885"],
        ["Halo: Combat Evolved","496776262136758277"],
        ["Hand of Fate","496776430110113843","266510"],
        ["Hard West","496776675351330846","307670"],
        ["Hate Plus","496776818855116811","239700"],
        ["Hatoful Boyfriend","496777244090302490","310080"],
        ["HAWKEN","496778224433627156","271290"],
        ["HEX: Shards of Fate","496778870104653824","410380"],
        ["Hitman: Blood Money","496779049524265010","6860"],
        ["Hoshizora no Memoria -Wish upon a Shooting Star-","496779855950774272","715580"],
        ["ibb & obb","496838264506941473","95400"],
        ["In Death","496838571735384122","605450"],
        ["Intruder","496838818813706270","518150"],
        ["Jade Empire: Special Edition","496839367621476352","7110"],
        ["Jurassic Park: The Game","496839741812113408","201830"],
        ["Kindred Spirits on the Roof","496845813461418005","402620"],
        ["King Arthur's Gold","496845988154048541","219830"],
        ["Krosmaster Arena","496846515382517770","329790"],
        ["Landmark","496846777023070218","297810"],
        ["Lara Croft and the Guardian of Light","496846884787191834","35130"],
        ["Legend of Dungeon","496847055793422336","238280"],
        ["LIGHTNING RETURNS: FINAL FANTASY XIII","496847425680572455","345350"],
        ["Limit Ragnarok Online","496847615456051220"],
        ["Lineage","496848201773482004"],
        ["Chris Sawyer's Locomotion","496848465301733376","356430"],
        ["Long Live The Queen","496848705027178496","251990"],
        ["Lovely Planet","496851684396630035","298600"],
        ["Lovers in a Dangerous Spacetime","496851934339268622","252110"],
        ["Lumini","496852060256337920","360840"],
        ["LYNE","496852270080851977","266010"],
        ["Magic Realm: Online","496852479615565834","864610"],
        ["Marvel Heroes 2015","496852775406141450","226320"],
        ["Marvel Heroes 2016","496853043103662080","226320"],
        ["Massive","496853196346621982","461400"],
        ["Master Reboot","496853347505012746","251850"],
        ["Nekojishi","497121061339529226","570840"],
        ["How to Survive","497169068466634792","250400"],
        ["Pathfinder: Kingmaker","497389403832844298","640820"],
        ["NEKOPARA Vol. 0","497660949260664832","385800"],
        ["Necropolis","497830439298400256","384490"],
        ["Assassin's Creed Odyssey","497898978466070528","812140"],
        ["Craft The World","498216676744101891","248390"],
        ["Midair","498457066738810890","439370"],
        ["CrossCode","498640615744077864","368340"],
        ["Jotun","498640773999362050","323580"],
        ["Monster Slayers","498641288250392600","496620"],
        ["We Happy Few","498728807881113620","320240"],
        ["Lost Saga North America","498938615934615552","266150"],
        ["Men of War: Assault Squad","498941421814939648","64000"],
        ["Might & Magic Heroes VI","498942150042451978"],
        ["Might & Magic Heroes VII","498942455903944704","321960"],
        ["MOTHERGUNSHIP","498942846032805908","574090"],
        ["Mountain","498943265475657728","313340"],
        ["Mudlet","498943730817171476"],
        ["Mugen Souls","498943830582755368","389870"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 3 Full Burst","498948228146921472","234670"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM Revolution","498971059291291648","272510"],
        ["Need for Speed: Carbon","498971474841960450"],
        ["NEO Scavenger","498971609764200478","248860"],
        ["Neocron Evolution","498971892968062976"],
        ["Next Car Game: Wreckfest","498971974945603587","228380"],
        ["Nicole (otome version)","498972346078461982","307190"],
        ["Nosgoth","498972985403899960","200110"],
        ["ONE PIECE PIRATE WARRIORS 3","498973375595675688","331600"],
        ["ONI","498979842277113857"],
        ["Peggle Deluxe","498980232938651648","3480"],
        ["Peggle Extreme","498980339470041123","3483"],
        ["Pinball Arcade","498980583096057905","238260"],
        ["Pixel Dungeon","498981118410752020","365900"],
        ["PixelJunk Shooter Ultimate","498981476050927653"],
        ["PixelJunk™ Shooter Ultimate","498981634339635253","332330"],
        ["MechWarrior: Living Legends","498984088418516992"],
        ["Plants vs. Zombies: Game of the Year","498985095378632704","3590"],
        ["Poi","498985543586021376","401810"],
        ["PokeMMO","498985820221603840"],
        ["PokerStars","498986175512576058"],
        ["Prepar3D","498986525757800468"],
        ["Primal Carnage","498986661104058378","215470"],
        ["Prime World","498986815227822080","235340"],
        ["ProjectRIK","498987268048945162"],
        ["Proteus","498987388891299859","219680"],
        ["Pyrite Heart","498987613416456220","324170"],
        ["Quake II","498987709629464586","2320"],
        ["Quiplash","498988229798920242","351510"],
        ["Race The Sun","498988774169116711","253030"],
        ["Ragnarok Online","498990766643740692"],
        ["Rappelz","498991137214955531"],
        ["Rayman 2 - The Great Escape","498991556724916225","15060"],
        ["Re-Volt","498994022048727050"],
        ["Reassembly","498997425965367313","329130"],
        ["ReCore","498999413172207653","537450"],
        ["Resident Evil Revelations / Biohazard Revelations","499004687719202816","222480"],
        ["Hidden Folks","499303420512174080","435400"],
        ["Tales of Escape","499330427455012874","587860"],
        ["BLOCKPOST","499743985045078036","706990"],
        ["Moon Hunters","500645675642388480","320040"],
        ["Serious Sam 2","500769428753874947","204340"],
        ["Resident Evil / biohazard HD REMASTER","500804924007907348","304240"],
        ["The Walking Dead: Season Two","500830174590271509","261030"],
        ["pla_toon","501063306065346580","891220"],
        ["Darkwood","501209864333164546","274520"],
        ["NBA 2K19","501373821886922752","841370"],
        ["I am Bread","501542797430489098","327890"],
        ["CreativeDestruction","501792352898121743","893520"],
        ["Bigscreen Beta","501925376747110440","457550"],
        ["Fuse","502281428168343573","257400"],
        ["Sonic Generations","502406586895958026","71340"],
        ["Zeus' Battlegrounds","502879677782818820","682290"],
        ["The Misfits","502910350413266954","614940"],
        ["World War 3","503228350761009162","674020"],
        ["SOULCALIBUR VI","503340646946308096","544750"],
        ["Oh...Sir! The Insult Simulator","503362822957432832","512250"],
        ["Danganronpa 2: Goodbye Despair","503578473227354112","413420"],
        ["OVERKILL's The Walking Dead - BETA","503632655137374219","952440"],
        ["Call of Cthulhu","503982482664849408","399810"],
        ["Asheron's Call","504021888805240914"],
        ["Reflex Arena","504024478100095016","328070"],
        ["Retro City Rampage™ DX","504026620068233235","204630"],
        ["Reus","504027911213285423","222730"],
        ["Revelation Online","504028382317772859","876330"],
        ["rFactor","504028685322551296","339790"],
        ["rFactor 2","504029217650901040","365960"],
        ["Rogue System","504029616151986198","366000"],
        ["Sakura Angels","504029936697344048","342380"],
        ["Sakura Clicker","504030053017845805","383080"],
        ["Sakura Spirit","504030205481058304","313740"],
        ["Screencheat","504030375606091776","301970"],
        ["Scrivener","504030662911590425"],
        ["Secret Ponchos","504030792184496148","265750"],
        ["Secrets of Grindea","504030959654535198","269770"],
        ["Shadowgrounds","504031323443167273","2500"],
        ["Shadowgrounds: Survivor","504031813619154974","11200"],
        ["Shadowrun","504032333532364840"],
        ["Shantae and the Pirate's Curse","504032449173389372","345820"],
        ["Shattered Skies","504033280149159986","447500"],
        ["Sid Meier's Railroads!","504033484919144452","7600"],
        ["SinaRun","504033675940200448","324470"],
        ["Slime CCG","504037755018412033","863560"],
        ["Snes9x","504041310605410315"],
        ["Songbringer","504042287345434624","367080"],
        ["Sonic Adventure DX","504042667714543626","71250"],
        ["Sonic Lost World","504044826954694780","329440"],
        ["Soul Axiom","504046230028943380","279900"],
        ["Space Pirates and Zombies","504046366302142494","107200"],
        ["SpaceChem","504046850584739850","92800"],
        ["Spider-Man 3","504047615139119143"],
        ["Sprint Vector","504050983400374292","590690"],
        ["Startup Company","504052120543166505","606800"],
        ["Steel Ocean","504052334960050176","390670"],
        ["STEINS;GATE","504052730042646579","412830"],
        ["Steredenn","504053684494401540","347160"],
        ["STRAFE","504054126280310794","442780"],
        ["Strife","504055085177765907","339280"],
        ["Strife: Veteran Edition","504055223543922708","317040"],
        ["Styx: Master of Shadows","504055375880912946","242640"],
        ["Suguri","504055570483904522","262240"],
        ["Super Monday Night Combat","504055809962147840","104700"],
        ["Superbrothers: Sword & Sworcery EP","504056145854464000","204060"],
        ["SURV1V3","504056431176056852","722180"],
        ["SWAT 4","504056709015404544"],
        ["Sword Coast Legends","504056938439507968","325600"],
        ["Sword of Asumi","504057095109214247","326950"],
        ["SYNTHETIK","504057233756389376","528230"],
        ["Take On Mars","504057417194143754","244030"],
        ["Tales from the Borderlands","504057675286315028","330830"],
        ["Tales of Maj'Eyal","504065891043115008","259680"],
        ["Tales of Monkey Island","504067053481754634","31210"],
        ["Tales of Zestiria","504070466948956160","351970"],
        ["Tales Runner","504071115799265280","328060"],
        ["Task Force","504071248888987676","611300"],
        ["Tetris® Ultimate","504071743963529226","316750"],
        ["Tetris","504071879993196544"],
        ["The Beginner's Guide","504073562785579018","303210"],
        ["The Elder Scrolls IV: Oblivion","504074409628401690","22330"],
        ["The Forgettable Dungeon","504075021677887541","375810"],
        ["THE KING OF FIGHTERS 2002 UNLIMITED MATCH","504075299877683230","222440"],
        ["The Marvellous Miss Take","504076592218112047","327310"],
        ["The Park","504076991759384596","402020"],
        ["The Sacred Tears TRUE","504077161246883850","316840"],
        ["The Secret World","504077629175889923","215280"],
        ["The Settlers 7: Paths to a Kingdom","504078051358015516","48120"],
        ["The Settlers: Rise of an Empire","504078174875942939","15330"],
        ["The Vanishing of Ethan Carter","504078553445302330","258520"],
        ["The Vanishing of Ethan Carter Redux","504078762292543506","400430"],
        ["There Was a Caveman","504079332512235573","407290"],
        ["Thomas Was Alone","504079439726903336","220780"],
        ["TIS-100","504079649702412295","370360"],
        ["Tomb Raider II","504079864681332739","225300"],
        ["Tomb Raider III: Adventures of Lara Croft","504080259151298560","225320"],
        ["Tomb Raider: Anniversary","504080427569643550","8000"],
        ["Tomb Raider: Chronicles","504080609598111771","225000"],
        ["Tomb Raider: Legend","504080831396970511","7000"],
        ["Tomb Raider: The Last Revelation","504081066848681984","224980"],
        ["Tomb Raider: Underworld","504081253314723874","8140"],
        ["Tony Hawk's Underground","504081569405730826"],
        ["Tony Hawk's Underground 2","504081807340470291"],
        ["Trackday Manager","504082602848813087","348030"],
        ["TransforBest","504082814350655518"],
        ["Triple Town","504083025211162677","209950"],
        ["Unravel","504084141319520299"],
        ["Unreal Tournament","504084447797313537"],
        ["Unreal Tournament 3","504084581989744679","13210"],
        ["Uplink","504085139983433774","1510"],
        ["War for the Overworld","504085687155425286","230190"],
        ["Warsow","504086535079985181"],
        ["WaveLand","504086615132733450","532170"],
        ["Wings of Vi","504086961498226688","318530"],
        ["Wolfenstein: The Old Blood","504087375618506772","350080"],
        ["Wonder Wickets","504087681635188766","598640"],
        ["X-Plane 11","504087790032650290","269950"],
        ["Xenonauts","504088140139462686","223830"],
        ["Zandronum","504088311594483722"],
        ["ZOMBI","504088792223842314","339230"],
        ["Zombies Monsters Robots","504089133900103714","306830"],
        ["9Dragons","504399459426369587","390100"],
        ["Age of Wushu","504422264599609344"],
        ["Alan Wake","504423339104796672","108710"],
        ["Argentum Online","504424067877699614"],
        ["Azure Striker Gunvolt","504426985305538600","388800"],
        ["Microsoft Allegiance","504444177413701632","700480"],
        ["Super House of Dead Ninjas","504468643384524800","224820"],
        ["Aseprite","504605035162763294","431730"],
        ["Full Metal Furies","504743823281487882","416600"],
        ["蒼の彼方のフォーリズム","504764773167136768"],
        ["Avalon Lords: Dawn Rises","504765148481716224","329280"],
        ["BlackShot: Mercenary Warfare FPS","504767731825115176","433350"],
        ["BlazBlue: Continuum Shift Extend","504768003469082655","294810"],
        ["Blobby Volley 2","504768329651585035"],
        ["Boundless","504768467724140544","324510"],
        ["Cabal 2","504769131615223838"],
        ["Cataclysm: Dark Days Ahead","504785474901114920"],
        ["CHAOS CODE -NEW SIGN OF CATASTROPHE-","504788636525395998","536560"],
        ["Chronicle: RuneScape Legends","504790398984781834","205890"],
        ["Combat Mission Black Sea","504801397825470464"],
        ["Combat Mission Shock Force","504801527219617808"],
        ["Command & Conquer™ Red Alert 2 and Yuri’s Revenge","504801959954612274"],
        ["Command: Modern Air / Naval Operations WOTY","504802253413154846","321410"],
        ["Cosmic Dust & Rust","504802641763762176","473560"],
        ["CosmicBreak","504802978784346122"],
        ["CosmicBreak2","504803174880903188"],
        ["CosmicLeague_US","504803374613528600"],
        ["Creeper World 2","504803589898633216"],
        ["Carrier Command: Gaea Mission","504824168861270033","65740"],
        ["Demul version 0.5.6.3","505116958086266920"],
        ["Homeworld: Deserts of Kharak","505117107097174062","281610"],
        ["Disgaea PC","505123261546496000","405900"],
        ["Disney Infinity 3.0: Gold Edition","505123562756112405","541670"],
        ["Disney Infinity 2.0: Gold Edition","505123882232053810","541660"],
        ["ドラゴンクエストＸ　いにしえの竜の伝承　オンライン","505125120960888877"],
        ["E.Y.E: Divine Cybermancy","505129908562034716","91700"],
        ["nQuake","505131009583480844"],
        ["Fable - The Lost Chapters","505133560391401472","204030"],
        ["TouHou Makuka Sai ~ Fantastic Danmaku Festival","505133803258249253","882710"],
        ["FCEUX 2.2.3","505134014034870283"],
        ["FINAL FANTASY XI","505134378138075144","23390"],
        ["Gahkthun of the Golden Lightning Steam Edition","505134723543203851","458380"],
        ["Garfield Kart","505134938354352128","362930"],
        ["SkyDrift","505135507907543070","91100"],
        ["Grandia II Anniversary Edition","505135738719961143","330390"],
        ["GRID Autosport","505135989694398512","255220"],
        ["The Fruit of Grisaia","505136406109356032","345610"],
        ["Grisaia Phantom Trigger Vol.2","505136671138906132","606520"],
        ["Microsoft Halo Trial","505137576256995328"],
        ["Heavy Weapon Deluxe","505137992642592815"],
        ["Hyperdimension Neptunia Re;Birth2 Sisters Generation","505138235937259549","351710"],
        ["Hyperdimension Neptunia Re;Birth3 V Generation","505138532700913671","353270"],
        ["Illarion","505138979264528414"],
        ["OpenITG","505139561995829278"],
        ["Invisible, Inc.","505139793940709376","243970"],
        ["IvAc","505139956017266688"],
        ["Just Cause","505140295931920404","6880"],
        ["神採りアルケミーマイスター","505140655501213696"],
        ["Kara no Shojo 2","505140834644000812"],
        ["Knights of Pen and Paper 2","505141441388085298","310060"],
        ["MTGArena","505142532297064468"],
        ["マジカルバトルアリーナNEXT・幻想郷空閃姫","505142782654939150"],
        ["Native Instruments Maschine 2","505143168287899676"],
        ["MELTY BLOOD Actress Again Current Code","505143546244890691","411370"],
        ["Metal Gear Solid 2 Substance","505146559835406352"],
        ["Modlands 0.512a version 0.512a","505147819255136297"],
        ["NEO AQUARIUM - The King of Crustaceans -","505150034698960952","355240"],
        ["Offspring Fling!","505150420377665566","211360"],
        ["OlliOlli2: Welcome to Olliwood","505150905696649216","365660"],
        ["Organ Trail: Director's Cut","505151146722197504","233740"],
        ["PangYa (NtreevSoft)","505151476427915283"],
        ["Perpetuum","505151662151958530","223410"],
        ["Phantasy Star Online Blue Burst","505152925115482112"],
        ["Phantom Breaker: Battle Grounds","505153286840516649","329490"],
        ["Project Hedra","505153723941781523"],
        ["Icons: Combat Arena","505187200011337738","684200"],
        ["LET IT DIE","505256510453186560","794600"],
        ["DiRT 2","505486620468838447","12840"],
        ["Mabinogi","505489300545208340","212200"],
        ["Metal Gear Solid","505489991175110676"],
        ["MapleRoyals","505490321174560783"],
        ["Houdini Indie","505490535629324318","502570"],
        ["Infantry","505490756782391338","670050"],
        ["Helbreath Apocalypse","505490939008122940"],
        ["Flash Flash Revolution","505491268755914772","771630"],
        ["Dwarf Fortress","505491707253620739"],
        ["Quake III","505493023031951411"],
        ["King of Fighters XIII","505493399688839170"],
        ["Nitronic Rush","505494175702188032"],
        ["PCSX2","505494914872770583"],
        ["Phase Shift","505495076974231588","865250"],
        ["Planescape: Torment","505495215856025620"],
        ["Q.U.B.E: Director's Cut","505496236548292648","239430"],
        ["Rebound Arena","505496835721396254","701260"],
        ["REGEN","505496955095482387","746040"],
        ["RetroArch","505497615748694018"],
        ["Return To Castle Wolfenstein","505497930292133908"],
        ["Rise of Agon","505498499043819520"],
        ["Rosenkreuzstilette","505498725297422351","564150"],
        ["S4 League","505498926443528202"],
        ["SC2VN - The eSports Visual Novel","505499045079416833","404480"],
        ["Shadow Complex Remastered","505500036214292545","385560"],
        ["Sonic & All Stars Racing Transformed","505500365404373004"],
        ["ePSXe","505500770683322399"],
        ["SoulWorker","505501322947199006"],
        ["SpyParty","505502210117861387","329070"],
        ["Super Smash Flash EXE Version 1.0","505502693113200640"],
        ["Super Smash Flash 2 Beta","505502904640208902"],
        ["The Floor is Lava","505503697799872532","809430"],
        ["The Last Remnant","505503999403884544","23310"],
        ["The Simpsons Hit & Run(TM)","505504523012276234"],
        ["Thrillville: Off the Rails","505504809437364244","6080"],
        ["Titanfall™","505505165705609246"],
        ["TMNT 2 - Battle Nexus","505505520417767425"],
        ["Tomb Raider (VI): The Angel of Darkness","505505686705405962","225020"],
        ["Tomoyo After ~It's a Wonderful Life~ English Edition","505505972899414046","462990"],
        ["Touhou 10: Mountain of Faith","505506583304732695"],
        ["Touhou 10.5: Scarlet Weather Rhapsody","505506928596877352"],
        ["Touhou 11: Subterranean Animism","505507257224658987"],
        ["Touhou 12: Undefined Fantastic Object","505512749149716480"],
        ["Touhou 12.3: Hisoutensoku","505513116302573578"],
        ["Touhou 12.5: Double Spoiler","505513477645926430"],
        ["Touhou 12.8: Great Fairy Wars","505513776607395868"],
        ["Touhou 13: Ten Desires","505514028341395495"],
        ["Touhou 13.5 Hopeless Mascarade","505514368520290305"],
        ["Touhou 14: Double Dealing Character","505514719885393960"],
        ["Touhou 14.3: Impossible Spell Card","505515309726433328"],
        ["Touhou 14.5: Urban Legend in Limbo","505515610667614232"],
        ["Touhou 15: Legacy of Lunatic Kingdom","505515966289936393"],
        ["Touhou 15.5: Antinomy of Common Flowers","505516276115046415","716710"],
        ["Touhou 7: Perfect Cherry Blossom","505516832590004244"],
        ["Touhou 7.5: Immaterial and Missing Power","505517064601993254"],
        ["Touhou 8: Imperishable Night","505517586327535646"],
        ["Touhou 9: Phantasmagoria Of Flower View","505517882873085952"],
        ["Touhou 9.5: Shoot the Bullet","505518102545432605"],
        ["Touhou Puppet Dance Performance","505518371333472276"],
        ["Touhou Sky Arena","505518699395022867"],
        ["The Legend of Heroes: Trails in the Sky","505519194146603009","251150"],
        ["The Legend of Heroes: Trails in the Sky SC","505519505091592222","251290"],
        ["VA-11 HALL-A","505520072870199335","447530"],
        ["VisualBoyAdvance","505520145997889546"],
        ["Warzone 2100","505520727521361941"],
        ["Xonotic","505520839303757848"],
        ["YGOPro","505520955649556490"],
        ["ZSNESw","505521162042736657"],
        ["Zwift","505523904517898240"],
        ["Allods Online","505531160990973952","459160"],
        ["Murderous Pursuits","505801835613913098","638070"],
        ["Sword Art Online: Hollow Realization Deluxe Edition","506057315485483008","607890"],
        ["METAL GEAR SURVIVE","506873722745913355","543900"],
        ["Aim Lab","506950362461110273","714010"],
        ["Galactic Civilizations III","507674068498120714","226860"],
        ["Parkasaurus","508008071411400724","591460"],
        ["Visage","508057374875975682","594330"],
        ["Kynseed","510199020782747732","758870"],
        ["Thronebreaker","511619499053678668","973760"],
        ["Paladins Strike","512498684211232768"],
        ["Fallout 76","512501896896970762"],
        ["Battlefield™ V","512699108809637890"],
        ["Battle Chef Brigade","512789120234422301","452570"],
        ["Kingsway","512789343157485602","588950"],
        ["Zenzizenzic","512789427462995988","327500"],
        ["Borderlands 3","514228311661084682"],
        ["Realm Royale","518088627234930688","813820"],
        ["Turok","519644267212177418"],
        ["Turok 2: Seeds of Evil","519644368735567873"],
        ["Ashen","520453007578628124","649950"],
        ["Hades","520462578061803588"],
        ["Nitro","521842831262875670"],
        ["Far Cry New Dawn","523154344187789312","939960"],
        ["ATLAS","526489929631531009","834910"],
        ["Paladins","528145079819436043","444090"],
        ["Metro Exodus","530454325214969866"],
        ["Sea of Thieves","535371564850479134"],
        ["LEGO Harry Potter: Years 5-7","535384357536399404","204120"],
        ["Subnautica: Below Zero","535869836748783616","848450"],
        ["Ghost Recon Breakpoint","540120593576493057"],
        ["Apex Legends","542075586886107149"],
        ["Farming Simulator 19","542474758835535872","787860"],
        ["Warhammer: Vermintide 2","542475118396309528","552500"],
        ["Anthem™","546175179542364160"],
        ["Spellbreak","549512435585908756","803370"],
        ["Heroes & Generals WWII","550277544025522176","227940"],
        ["Dawn of Man","553697181249437716","858810"],
        ["Warface","554573307161214977","291480"],
        ["Tom Clancy's The Division 2","554921822626381879"],
        ["Temtem","558547388583772201","745920"],
        ["Mutant Year Zero: Road to Eden","560781100197216267","760060"],
        ["Bloodstained: Ritual of the Night","565341641427124244","692850"],
        ["Sekiro™: Shadows Die Twice","569008830701240340","814380"],
        ["Risk of Rain 2","569253958967885828","632360"],
        ["Satisfactory","572456126872944651"],
        ["MORDHAU","575412499399180288","629760"],
        ["Baba Is You","576482762446602270","736260"],
        ["Staxel","584069374462394368","405710"],
        ["Supreme Ruler Ultimate","588739017718366208","314980"],
        ["Dota Underlords","592976500802846750","1046930"],
        ["PUBG LITE","597588168178663434","578080"],
        ["Swords of Gurrah","597860020935327787","833090"],
        ["Lethal League Blaze","606163888052109312","553310"],
        ["Bloons TD 6","614380482620293151","960090"],
        ["Bloons Adventure Time TD","614448244260339712","979060"],
        ["World of Warcraft Classic","615752773690064908"],
        ["Tower Keepers","618575278339260467","881490"],
        ["Gears 5","620685135066693642","1097840"],
        ["Control","620758922940383242"],
        ["Call of Duty®: Modern Warfare®","631914894446297148"],
        ["Legends of Runeterra","633832498614370323"],
        ["The Outer Worlds","637382434089861160"],
        ["Red Dead Redemption 2","643897785271189524"],
        ["STAR WARS Jedi: Fallen Order™","649511727641133066","1172380"],
        ["Pirates of the Burning Sea","651923442286985217"],
        ["Halo: The Master Chief Collection","653432003798106122","976730"],
        ["Forza Horizon 4","656353816370741248"],
        ["DOOM Eternal","693016355007496202","782330"],
        ["Return of the Obra Dinn","696065774061879446","653530"],
        ["VALORANT","700136079562375258"],
        ["Age of Empires: Definitive Edition","700150526729519165","1017900"],
        ["Age of Empires II: Definitive Edition","700150779050459157","813780"],
        ["Wurm Online","714975833495830608"],
        ["Age of Empires: Definitive Edition","720771267149561936"],
        ["Age of Empires II: Definitive Edition","720771660768084008"],
        ["The Surge 2","733854133471150151","644830"],
        ["DEATH STRANDING","734286565114904586","1190460"],
        ["Rogue Company","737391147659558963","872200"],
        ["Grounded","738856512868450314","962130"],
        ["Fall Guys","742897755160313986","1097150"],
        ["Microsoft Flight Simulator","750925046729670796","1250410"],
        ["Genshin Impact","762434991303950386"],
        ["Assassin's Creed Valhalla","775754545778786314"],
        ["IL-2 Sturmovik: Battle of Stalingrad","777681581917601792","307960"],
        ["Call of Duty®: Black Ops Cold War","783440677958189096"],
        ["Cyberpunk 2077","787443973538971748","1091500"],
        ["STAR WARS™ Battlefront™ (classic)","788507043358834698"],
        ["Star Wars: Battlefront 2 (Classic, 2005)","788511984575316028","6060"]
    ];

    const DEFAULTS = { minMinutes: 23, maxMinutes: 38, paused: false, minimized: false, corner: "bottom-right" };
    const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const settings = (() => {
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) {}
        const s = { ...DEFAULTS, ...saved };
        s.minMinutes = clamp(Number(s.minMinutes) || DEFAULTS.minMinutes, 1, 1440);
        s.maxMinutes = clamp(Number(s.maxMinutes) || DEFAULTS.maxMinutes, s.minMinutes, 1440);
        s.paused = Boolean(s.paused);
        s.minimized = Boolean(s.minimized);
        if (!CORNERS.includes(s.corner)) s.corner = DEFAULTS.corner;
        return s;
    })();
    const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (_) {} };

    function normalize(s) {
        return String(s).toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")
            .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    }
    function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function getWebpackRequire() {
        if (window.Vencord?.Webpack?.wreq?.c) return window.Vencord.Webpack.wreq;
        if (typeof window.webpackChunkdiscord_app === "undefined") return null;
        let req;
        window.webpackChunkdiscord_app.push([[Symbol("game-presence")], {}, r => { req = r; }]);
        window.webpackChunkdiscord_app.pop();
        return req;
    }

    function findInModules(req, predicate) {
        for (const mod of Object.values(req.c)) {
            let exp;
            try { exp = mod?.exports; } catch (_) { continue; }
            if (!exp) continue;
            const candidates = [exp, exp.default, ...(typeof exp === "object" ? Object.values(exp) : [])];
            for (const value of candidates) {
                try { if (value && predicate(value)) return value; } catch (_) {}
            }
        }
        return null;
    }

    const req = getWebpackRequire();
    if (!req?.c) throw new Error("[Game Presence] Webpack de Discord introuvable (Discord desktop requis).");

    const runStore = findInModules(req, v => typeof v === "object" &&
        (v.getName?.() === "RunningGameStore" || v.constructor?.displayName === "RunningGameStore"));
    const dispatcher = findInModules(req, v => typeof v.dispatch === "function" &&
        typeof v.subscribe === "function" && v._subscriptions);
    if (!runStore || !dispatcher) throw new Error("[Game Presence] RunningGameStore ou Dispatcher introuvable.");

    const PATCHED = ["getRunningGames", "getGameForPID", "getVisibleGame", "getVisibleRunningGames", "getCandidateGames"];
    const original = {};
    for (const key of PATCHED) if (typeof runStore[key] === "function") original[key] = runStore[key];
    if (!original.getRunningGames || !original.getGameForPID) {
        throw new Error("[Game Presence] Méthodes du RunningGameStore introuvables.");
    }

    const isLinux = /Linux/i.test(navigator.userAgent);
    const OS = isLinux ? "linux" : "win32";
    const pid = 45000 + Math.floor(Math.random() * 10000);
    const order = shuffle(CATALOG.map((_, i) => i));
    let cursor = 0;
    const NAMES = CATALOG.map(([name]) => normalize(name));
    let current = null;
    let stopped = false;
    let switchTimer = null;
    let tickTimer = null;
    let nextSwitchAt = 0;
    let switchDuration = 0;

    const entry = () => CATALOG[order[cursor]];
    const searchGames = q => NAMES
        .map((n, i) => ({ i, n, pos: n.indexOf(q) }))
        .filter(hit => hit.pos !== -1)
        .sort((a, b) => (b.n === q) - (a.n === q) || a.pos - b.pos || a.n.length - b.n.length)
        .map(hit => hit.i);
    const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "game";

    function buildGame([name, applicationId]) {
        const exeName = isLinux ? slug(name) : `${slug(name)}.exe`;
        const exePath = isLinux
            ? `/home/user/.local/share/games/${slug(name)}/${exeName}`
            : `c:/program files/${slug(name)}/${exeName}`;
        return {
            id: null,
            name,
            application_id: applicationId,
            pid,
            pidPath: [pid],
            processName: name,
            start: Date.now(),
            exeName,
            exePath,
            cmdLine: exePath,
            executables: [{ os: OS, name: exeName, is_launcher: false }],
            windowHandle: 0,
            fullscreenType: 0,
            overlay: false,
            sandboxed: false,
            hidden: false,
            isLauncher: false
        };
    }

    const withoutOurs = list => (list ?? []).filter(g => g?.pid !== pid);
    const realGames = () => withoutOurs(original.getRunningGames.call(runStore));

    function patchStore() {
        runStore.getRunningGames = () => current ? [...realGames(), current] : realGames();
        runStore.getGameForPID = p => (p === pid && current) ? current : original.getGameForPID.call(runStore, p);
        if (original.getVisibleGame) {
            runStore.getVisibleGame = () => current ?? original.getVisibleGame.call(runStore);
        }
        for (const key of ["getVisibleRunningGames", "getCandidateGames"]) {
            if (!original[key]) continue;
            runStore[key] = () => {
                const list = withoutOurs(original[key].call(runStore));
                return current ? [...list, current] : list;
            };
        }
    }

    function restoreStore() {
        for (const [key, fn] of Object.entries(original)) runStore[key] = fn;
    }

    function clearActivity() {
        if (!current) return;
        const old = current;
        current = null;
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [], removed: [old], games: realGames() });
        dispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", socketId: null, pid, activity: null });
    }

    function activate() {
        clearActivity();
        current = buildGame(entry());
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [current], removed: [], games: runStore.getRunningGames() });
        dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            socketId: null,
            pid,
            activity: {
                name: current.name,
                application_id: current.application_id,
                type: 0,
                timestamps: { start: current.start }
            }
        });
        ui.showGame(entry(), cursor, order.length);
        console.log(`[Game Presence] En jeu (${cursor + 1}/${order.length}) : ${current.name}`);
    }

    function schedule() {
        clearTimeout(switchTimer);
        switchTimer = null;
        if (settings.paused) {
            nextSwitchAt = 0;
        } else {
            const min = settings.minMinutes * 60_000;
            const max = settings.maxMinutes * 60_000;
            switchDuration = min + Math.floor(Math.random() * (max - min + 1));
            nextSwitchAt = Date.now() + switchDuration;
            switchTimer = setTimeout(() => go(1), switchDuration);
        }
        ui.tick();
        ui.setPaused(settings.paused);
    }

    function go(step) {
        cursor = (cursor + step + order.length) % order.length;
        activate();
        schedule();
    }

    function playIndex(catalogIndex) {
        const pos = order.indexOf(catalogIndex);
        if (pos < 0) return;
        cursor = pos;
        activate();
        schedule();
    }

    function togglePause() {
        settings.paused = !settings.paused;
        save();
        schedule();
    }

    function setIntervals(min, max) {
        settings.minMinutes = clamp(Math.round(min) || 1, 1, 1440);
        settings.maxMinutes = clamp(Math.round(max) || settings.minMinutes, settings.minMinutes, 1440);
        save();
        schedule();
    }

    function stop() {
        if (stopped) return;
        stopped = true;
        clearTimeout(switchTimer);
        clearInterval(tickTimer);
        clearActivity();
        restoreStore();
        window.removeEventListener("pagehide", stop);
        ui.destroy();
        delete window[LOCK];
        console.log("[Game Presence] Arrêté, RunningGameStore restauré.");
    }

    const ui = (() => {
        const host = document.createElement("div");
        host.id = "gp-host";
        host.style.cssText = "position:fixed;z-index:999999;";
        const shadow = host.attachShadow({ mode: "open" });

        shadow.innerHTML = `
<style>
:host { --accent:#7d54d9; --accent-hi:#936ff0; --bg:rgba(18,19,24,.82);
        --text:#f2f3f5; --muted:#949ba4; --soft:#b5bac1; --danger:#da373c; --ok:#23a55a; }
* { box-sizing:border-box; font-family:"gg sans","Noto Sans","Helvetica Neue",Arial,sans-serif; }
button { font:inherit; border:0; cursor:pointer; }
.panel { width:310px; padding:14px 16px; color:var(--text); background:var(--bg);
         backdrop-filter:blur(14px); border:1px solid var(--accent); border-radius:14px;
         box-shadow:0 12px 32px rgba(0,0,0,.45); user-select:none;
         transition:transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s; }
.panel.pulse { transform:translateY(-3px); box-shadow:0 12px 32px rgba(125,84,217,.35), 0 0 18px rgba(125,84,217,.35); }
.panel.dragging { transition:none; opacity:.85; }
.mini { display:none; width:48px; height:48px; border-radius:50%; background:var(--bg);
        border:1px solid var(--accent); font-size:20px; color:#fff; box-shadow:0 8px 20px rgba(0,0,0,.45); }
:host(.minimized) .panel { display:none; }
:host(.minimized) .mini { display:grid; place-items:center; }

.head { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; cursor:grab; }
.badge { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.6px;
         text-transform:uppercase; color:var(--muted); }
.dot { width:8px; height:8px; border-radius:50%; background:var(--ok); box-shadow:0 0 8px var(--ok);
       animation:blink 2s infinite ease-in-out; }
.paused .dot { background:#f0b232; box-shadow:0 0 8px #f0b232; animation:none; }
@keyframes blink { 50% { opacity:.4; } }
.tools { display:flex; gap:4px; }
.tool { background:rgba(255,255,255,.06); color:var(--soft); border-radius:6px; padding:4px 8px; font-size:11px; font-weight:600; }
.tool:hover { background:var(--accent); color:#fff; }
.tool.close:hover { background:var(--danger); }

.game { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.icon { width:40px; height:40px; flex-shrink:0; border-radius:10px; overflow:hidden; display:grid; place-items:center;
        font-size:18px; background:linear-gradient(135deg,var(--accent),#5639a0); box-shadow:0 4px 10px rgba(125,84,217,.38); }
.icon img { width:100%; height:100%; object-fit:cover; }
.info { min-width:0; flex:1; }
.title { font-size:14px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:opacity .15s; }
.sub { margin-top:2px; font-size:11px; color:var(--muted); font-variant-numeric:tabular-nums; }

.track { height:4px; border-radius:2px; overflow:hidden; background:rgba(255,255,255,.08); }
.bar { height:100%; width:0; background:linear-gradient(90deg,var(--accent),#b18cff); transition:width 1s linear; }

.player { display:flex; justify-content:center; align-items:center; gap:12px; margin-top:12px; }
.pbtn { width:28px; height:28px; border-radius:50%; background:transparent; color:var(--soft); font-size:14px;
        display:grid; place-items:center; transition:background .15s,color .15s,transform .15s; }
.pbtn:hover { color:#fff; background:rgba(125,84,217,.28); transform:scale(1.08); }
.pbtn.play { width:36px; height:36px; background:var(--accent); color:#fff; box-shadow:0 4px 12px rgba(125,84,217,.42); }
.pbtn.play:hover { background:var(--accent-hi); }

.drawer { display:none; margin-top:12px; padding:12px; border-radius:12px;
          background:rgba(25,22,35,.7); border:1px solid rgba(125,84,217,.5); }
.drawer.open { display:block; }
.drawer h4 { margin:0 0 10px; font-size:12px; }
.row { display:flex; align-items:center; justify-content:space-between; gap:10px; margin:8px 0; font-size:11px; font-weight:600; color:var(--soft); }
input { height:30px; padding:5px 9px; border-radius:7px; border:1px solid rgba(255,255,255,.13);
        background:rgba(8,9,13,.6); color:#fff; font:inherit; font-size:12px; outline:none; }
input:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(125,84,217,.2); }
input[type=number] { width:76px; text-align:right; -moz-appearance:textfield; }
input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
.search { width:100%; }
.apply { width:100%; margin-top:6px; padding:7px; border-radius:7px; background:var(--accent); color:#fff; font-size:12px; font-weight:600; }
.apply:hover { background:var(--accent-hi); }
.results { margin-top:6px; max-height:180px; overflow-y:auto; }
.result { display:block; width:100%; padding:6px 8px; border-radius:5px; background:transparent; color:var(--soft);
          font-size:12px; text-align:left; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.result:hover { background:rgba(125,84,217,.28); color:#fff; }
.empty { padding:6px 8px; font-size:11px; color:var(--muted); }
</style>
<button class="mini" title="Afficher Game Presence">🎮</button>
<div class="panel">
  <div class="head">
    <div class="badge"><span class="dot"></span><span class="count"></span></div>
    <div class="tools">
      <button class="tool" data-act="search" title="Choisir un jeu">🔍</button>
      <button class="tool" data-act="settings" title="Réglages">⚙</button>
      <button class="tool" data-act="minimize" title="Réduire">_</button>
      <button class="tool close" data-act="stop" title="Arrêter">✕</button>
    </div>
  </div>
  <div class="game">
    <div class="icon">🎮</div>
    <div class="info"><div class="title">…</div><div class="sub"></div></div>
  </div>
  <div class="track"><div class="bar"></div></div>
  <div class="player">
    <button class="pbtn" data-act="prev" title="Jeu précédent">⏮</button>
    <button class="pbtn play" data-act="toggle" title="Pause">⏸</button>
    <button class="pbtn" data-act="next" title="Jeu suivant">⏭</button>
  </div>
  <div class="drawer" data-drawer="search">
    <input class="search" type="text" placeholder="Rechercher parmi ${CATALOG.length} jeux…" spellcheck="false">
    <div class="results"></div>
  </div>
  <div class="drawer" data-drawer="settings">
    <h4>Changement de jeu toutes les…</h4>
    <div class="row"><label for="gp-min">Minimum (min)</label><input id="gp-min" type="number" min="1" max="1440"></div>
    <div class="row"><label for="gp-max">Maximum (min)</label><input id="gp-max" type="number" min="1" max="1440"></div>
    <button class="apply" data-act="apply">Appliquer</button>
  </div>
</div>`;

        const $ = sel => shadow.querySelector(sel);
        const panel = $(".panel");
        const els = {
            count: $(".count"), icon: $(".icon"), title: $(".title"), sub: $(".sub"), bar: $(".bar"),
            play: $(".play"), min: $("#gp-min"), max: $("#gp-max"), search: $(".search"), results: $(".results")
        };

        const placeAtCorner = corner => {
            const [v, h] = corner.split("-");
            Object.assign(host.style, { top: "", bottom: "", left: "", right: "" });
            host.style[v] = "24px";
            host.style[h] = "24px";
        };
        placeAtCorner(settings.corner);
        if (settings.minimized) host.classList.add("minimized");

        let drag = null;
        $(".head").addEventListener("pointerdown", e => {
            if (e.target.closest("button")) return;
            const r = host.getBoundingClientRect();
            drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
            panel.classList.add("dragging");
            e.currentTarget.setPointerCapture(e.pointerId);
        });
        $(".head").addEventListener("pointermove", e => {
            if (!drag) return;
            Object.assign(host.style, {
                left: `${clamp(e.clientX - drag.dx, 8, innerWidth - host.offsetWidth - 8)}px`,
                top: `${clamp(e.clientY - drag.dy, 8, innerHeight - host.offsetHeight - 8)}px`,
                right: "", bottom: ""
            });
        });
        const endDrag = e => {
            if (!drag) return;
            drag = null;
            panel.classList.remove("dragging");
            const r = host.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            settings.corner = `${cy < innerHeight / 2 ? "top" : "bottom"}-${cx < innerWidth / 2 ? "left" : "right"}`;
            save();
            placeAtCorner(settings.corner);
        };
        $(".head").addEventListener("pointerup", endDrag);
        $(".head").addEventListener("pointercancel", endDrag);

        const toggleDrawer = name => {
            for (const d of shadow.querySelectorAll(".drawer")) {
                d.classList.toggle("open", d.dataset.drawer === name && !d.classList.contains("open"));
            }
            if ($(`.drawer[data-drawer="search"]`).classList.contains("open")) {
                els.search.value = "";
                renderResults("");
                els.search.focus();
            }
            if ($(`.drawer[data-drawer="settings"]`).classList.contains("open")) {
                els.min.value = settings.minMinutes;
                els.max.value = settings.maxMinutes;
            }
        };
        const closeDrawers = () => shadow.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));

        const renderResults = query => {
            const q = normalize(query);
            const hits = q ? searchGames(q).slice(0, 30) : [];
            els.results.replaceChildren(...(hits.length ? hits.map(i => {
                const b = document.createElement("button");
                b.className = "result";
                b.textContent = CATALOG[i][0];
                b.onclick = () => { closeDrawers(); playIndex(i); };
                return b;
            }) : [Object.assign(document.createElement("div"), {
                className: "empty", textContent: q ? "Aucun jeu trouvé." : "Tape le nom d'un jeu."
            })]));
        };
        els.search.addEventListener("input", () => renderResults(els.search.value));
        for (const input of [els.search, els.min, els.max]) {
            for (const type of ["keydown", "keyup", "keypress"]) {
                input.addEventListener(type, e => e.stopPropagation());
            }
        }
        els.search.addEventListener("keydown", e => {
            if (e.key === "Enter") els.results.querySelector(".result")?.click();
            if (e.key === "Escape") closeDrawers();
        });
        for (const input of [els.min, els.max]) {
            input.addEventListener("keydown", e => {
                if (e.key === "Enter") actions.apply();
            });
        }

        const actions = {
            prev: () => go(-1),
            next: () => go(1),
            toggle: togglePause,
            stop,
            search: () => toggleDrawer("search"),
            settings: () => toggleDrawer("settings"),
            minimize: () => { host.classList.add("minimized"); settings.minimized = true; save(); },
            apply: () => { setIntervals(Number(els.min.value), Number(els.max.value)); closeDrawers(); }
        };
        shadow.addEventListener("click", e => {
            const btn = e.target.closest("[data-act]");
            if (btn) actions[btn.dataset.act]?.();
        });
        $(".mini").addEventListener("click", () => { host.classList.remove("minimized"); settings.minimized = false; save(); });

        document.body.appendChild(host);

        let renderToken = 0;
        return {
            showGame([name, , steamId], idx, total) {
                const token = ++renderToken;
                els.count.textContent = `En jeu · ${idx + 1}/${total}`;
                els.title.style.opacity = "0";
                panel.classList.add("pulse");
                setTimeout(() => {
                    if (token !== renderToken) return;
                    els.title.textContent = name;
                    els.title.title = name;
                    els.title.style.opacity = "1";
                    els.icon.textContent = "🎮";
                    if (steamId) {
                        const img = new Image();
                        img.alt = "";
                        img.onload = () => { if (token === renderToken) els.icon.replaceChildren(img); };
                        img.src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${steamId}/capsule_184x69.jpg`;
                    }
                }, 150);
                setTimeout(() => { if (token === renderToken) panel.classList.remove("pulse"); }, 900);
            },
            tick() {
                if (!nextSwitchAt) {
                    els.sub.textContent = "Rotation en pause";
                    els.bar.style.width = "0%";
                    return;
                }
                const left = Math.max(0, nextSwitchAt - Date.now());
                const s = Math.floor(left / 1000);
                const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
                els.sub.textContent = `Prochain jeu dans ${h ? `${h}h ` : ""}${m}m ${String(sec).padStart(2, "0")}s`;
                els.bar.style.width = `${(((switchDuration - left) / switchDuration) * 100).toFixed(1)}%`;
            },
            setPaused(paused) {
                panel.classList.toggle("paused", paused);
                els.play.textContent = paused ? "▶" : "⏸";
                els.play.title = paused ? "Reprendre la rotation" : "Mettre en pause";
            },
            destroy() { host.remove(); }
        };
    })();

    window[LOCK] = {
        stop,
        next: () => go(1),
        previous: () => go(-1),
        togglePause,
        play: name => {
            const q = normalize(name ?? "");
            const i = q ? searchGames(q)[0] : undefined;
            if (i === undefined) return console.warn(`[Game Presence] Jeu introuvable : ${name}`);
            playIndex(i);
        },
        setIntervals,
        get current() { return current?.name ?? null; },
        get games() { return CATALOG.map(([n]) => n); }
    };

    window.addEventListener("pagehide", stop, { once: true });
    patchStore();
    activate();
    schedule();
    tickTimer = setInterval(() => ui.tick(), 1000);

    console.log(`[Game Presence] ${CATALOG.length} jeux chargés. Commandes : window.__gamePresence.next() / .play("Minecraft") / .stop()`);
})();
