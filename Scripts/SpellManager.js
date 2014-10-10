//SpellArray Gist: https://gist.github.com/BaldarSilveraxe/b870375736cce7a7bee0
///Googl File: https://docs.google.com/spreadsheets/d/1U0zeNzWa5ntISV8ILpldk6VsH0UtwIinuTx0NFjbAh0/edit?usp=sharing

on("ready", function() {
    on("chat:message", function (msg) {
        if (msg.type != "api") return;
        msg.who = msg.who.replace(" (GM)", "");
        msg.content = msg.content.replace("(GM) ", "");
        var command = msg.content.split(" ", 1);

        if(command == "!spellbooksY" || command == "!spellbooksy") {spellbooks();};
        if(command == "!updatespellY" || command == "!updatespelly") {updatespell();};
        if(command == "!updatelistY" || command == "!updatelisty") {updateList();};
        if(command == "!getvalues") {getvalues();};
    });
});

//--Utility Function
var fixNewObject = fixNewObject || function(obj){
    var p = obj.changed._fbpath;
    var new_p = p.replace(/([^\/]*\/){4}/, "/");
    obj.fbpath = new_p;
	 return obj;   
};

//--Utility Function
function sortJSON(data, key) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

var roll20API;
roll20API = roll20API || {};

roll20API.AbjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615593/BPr51lRrEK-mLHttyPvxgg/thumb.png?1410959413";
roll20API.ConjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615572/pNQe2tM6WpXBmM2pepulhw/thumb.png?1410959398";
roll20API.DivinationURL = "https://s3.amazonaws.com/files.d20.io/images/5615570/O7ko68ZRURyfSlgBrTY3Lg/thumb.png?1410959398";
roll20API.EnchantmentURL = "https://s3.amazonaws.com/files.d20.io/images/5615575/V_P_LYbbP0ENamKFXfipqA/thumb.png?1410959401";
roll20API.EvocationURL = "https://s3.amazonaws.com/files.d20.io/images/5615577/B8Z9xHbWb5FbNdpcVtHkYw/thumb.png?1410959402";
roll20API.IllusionURL = "https://s3.amazonaws.com/files.d20.io/images/5615579/zUTfqXHdH_jUYaZGUJ4tqA/thumb.png?1410959405";
roll20API.NecromancyURL = "https://s3.amazonaws.com/files.d20.io/images/5615582/vQWfj2UN_BDl_ha5SHfhpg/thumb.png?1410959407";
roll20API.TransmutationURL = "https://s3.amazonaws.com/files.d20.io/images/5615587/apku_oeWkIEvayXFV5NRNg/thumb.png?1410959409";
roll20API.UnkownURL = "https://s3.amazonaws.com/files.d20.io/images/5615589/XcustOYczhTZ2EFfio-aDg/thumb.png?1410959411";
roll20API.DeprecateURL = "https://s3.amazonaws.com/files.d20.io/images/5615569/Twn1rGhV0q-cNwm6ECUkmg/thumb.png?1410959397";
roll20API.OnAbjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615595/nn_-bXApbGBRF5q_Be0ksA/thumb.png?1410959415";
roll20API.OnConjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615567/NvDVz3uciszSXBhc7GRFfQ/thumb.png?1410959397";
roll20API.OnDivinationURL = "https://s3.amazonaws.com/files.d20.io/images/5615571/Qn7NxqcfNZ9es5tWF4LV1A/thumb.png?1410959398";
roll20API.OnEnchantmentURL = "https://s3.amazonaws.com/files.d20.io/images/5615573/qBZWUOipgYZWs8GiL4PSXw/thumb.png?1410959401";
roll20API.OnEvocationURL = "https://s3.amazonaws.com/files.d20.io/images/5615578/FgKm5tn61MkhBRBjEfGiOQ/thumb.png?1410959402";
roll20API.OnIllusionURL = "https://s3.amazonaws.com/files.d20.io/images/5615581/waQcPMI7kY3m87Pag8Jw_Q/thumb.png?1410959406";
roll20API.OnNecromancyURL = "https://s3.amazonaws.com/files.d20.io/images/5615583/u5II5AHr90QlU9d-o_f4Ng/thumb.png?1410959407";
roll20API.OnTransmutationURL = "https://s3.amazonaws.com/files.d20.io/images/5615588/x4Fs2oNGUPOjzF4uxtc2gg/thumb.png?1410959411";
roll20API.OnUnkownURL = "https://s3.amazonaws.com/files.d20.io/images/5615591/qVdvGm7biZ8WBvKgyLu8sA/thumb.png?1410959412";
roll20API.TokAbjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615594/FskjjkSGdPR94bF52A6odA/thumb.png?1410959414";
roll20API.TokConjurationURL = "https://s3.amazonaws.com/files.d20.io/images/5615568/Xa-ih1l47g5_RZfK_TOJFA/thumb.png?14109593977";
roll20API.TokDivinationURL = "https://s3.amazonaws.com/files.d20.io/images/5615574/aeRc8Hr-eZyl4TkhbW9EWg/thumb.png?1410959401";
roll20API.TokEnchantmentURL = "https://s3.amazonaws.com/files.d20.io/images/5615576/_dqjteEEz8MyP-9H71EirA/thumb.png?1410959402";
roll20API.TokEvocationURL = "https://s3.amazonaws.com/files.d20.io/images/5615580/PzWcSxZcSni_pwS3rKTEvw/thumb.png?1410959405";
roll20API.TokIllusionURL = "https://s3.amazonaws.com/files.d20.io/images/5615584/jU2nOVFxvZnD-DLcg2nSCw/thumb.png?1410959407";
roll20API.TokNecromancyURL = "https://s3.amazonaws.com/files.d20.io/images/5615586/Oujs6lnIyUZEjis7e8eZSQ/thumb.png?1410959409";
roll20API.TokTransmutationURL = "https://s3.amazonaws.com/files.d20.io/images/5615590/oNtLsi41g-XJ9Y5MNKAXSw/thumb.png?1410959411";
roll20API.TokUnkownURL = "https://s3.amazonaws.com/files.d20.io/images/5615592/5TMgYd-FUTj0TnrFUzU03w/thumb.png?1410959413";

roll20API.spellbooks = [
    {Class: "Barbarian", Short: "BN", Name: "barbarian_level", SaveDC: "0",                         StatBonus: "0",                Stat: "0",            Gained: "Other Source"},
    {Class: "Bard",      Short: "BD", Name: "bard_level",      SaveDC: "bard_spell_dc",             StatBonus: "charisma_mod",     Stat: "charisma",     Gained: "Bard"},
    {Class: "Cleric",    Short: "CC", Name: "cleric_level",    SaveDC: "cleric_spell_dc",           StatBonus: "wisdom_mod",       Stat: "wisdom",       Gained: "Cleric"},
    {Class: "Druid",     Short: "DD", Name: "druid_level",     SaveDC: "druid_spell_dc",            StatBonus: "wisdom_mod",       Stat: "wisdom",       Gained: "Druid"},
    {Class: "Fighter",   Short: "FR", Name: "fighter_level",   SaveDC: "eldritch_knight_spell_dc",  StatBonus: "intelligence_mod", Stat: "intelligence", Gained: "Eldritch Knight"},
    {Class: "Monk",      Short: "MK", Name: "monk_level",      SaveDC: "0",                         StatBonus: "wisdom_mod",       Stat: "wisdom",       Gained: "Other Source"},
    {Class: "Paladin",   Short: "PN", Name: "paladin_level",   SaveDC: "paladin_spell_dc",          StatBonus: "charisma_mod",     Stat: "charisma",     Gained: "Paladin"},
    {Class: "Ranger",    Short: "RR", Name: "ranger_level",    SaveDC: "ranger_spell_dc",           StatBonus: "wisdom_mod",       Stat: "wisdom",       Gained: "Ranger"},
    {Class: "Rogue",     Short: "RE", Name: "rogue_level",     SaveDC: "arcane_trickster_spell_dc", StatBonus: "intelligence_mod", Stat: "intelligence", Gained: "Arcane Trickster"},
    {Class: "Sorcerer",  Short: "SR", Name: "sorcerer_level",  SaveDC: "sorcerer_spell_dc",         StatBonus: "charisma_mod",     Stat: "charisma",     Gained: "Sorcerer"},
    {Class: "Warlock",   Short: "WK", Name: "warlock_level",   SaveDC: "warlock_spell_dc",          StatBonus: "charisma_mod",     Stat: "charisma",     Gained: "Warlock"},
    {Class: "Wizard",    Short: "WD", Name: "wizard_level",    SaveDC: "wizard_spell_dc",           StatBonus: "intelligence_mod", Stat: "intelligence", Gained: "Wizard"}
];

var characters = [];
var spellCastingClassLevel
var spellCastingAttackMod

//Used to find characters on the "Spell Book" page by finding tokens that represent character sheets.
findCharacterByGraphics = function() {
    characters = [];
    var spellBookExists = false;
    var pageCheck = findObjs({type: "page", name: "Spell Book"});
    var errorTxt = "/direct <br><b>ERROR!</b><br><small>";
    if(pageCheck.length != 1){
        if(pageCheck.length == 0){errorTxt += "'Spell Book' page does not exist.</small>"
        }else{errorTxt += "Multiple 'Spell Book' pages exist.</small>"};
        sendChat("API", errorTxt);return;
    };
    var spellBookPageGraphics = findObjs({_pageid: findObjs({type: "page", name: "Spell Book"})[0].get("_id"), _type: "graphic"});
    _.each(spellBookPageGraphics, function(indexSpellBookPageGraphics) {
        if(indexSpellBookPageGraphics.get("represents").length != 0){
            var character = findObjs({type: "character", _id: indexSpellBookPageGraphics.get("represents")});
            if(character[0].get("name") == "Spell Book"){spellBookExists = true};
            if(character[0].get("name") != "Spell Book"){characters.push(character);};
        };
    });
    if(spellBookExists == false){sendChat("API", errorTxt + "Token representing 'Spell Book' not found.</small>");return;};
    if(characters.length == 0){sendChat("API", errorTxt + "No tokens representing character found on the 'Spell Book' page.</small>");return;};
    sendChat("Script Started", "~~~~~~~~~");
    sendChat("API", "/direct <br><small>Processing your 'Spell Book' request...</small>");
};

//Builds rolable tables that are related to character and populated with spells based on class(es)
spellbooks = function() {
    findCharacterByGraphics();
    
//Checks for and if needed creeates rollable talbe for each charcter in the charcter array.
//The rollable talbe name will be like "charcter name{-JWZiG0l2d7vdTE3VrgC}"
//Keeps the table name readable but also has the character ID in case the character name changes.
    var rollabletables = findObjs({type: "rollabletable"});
    _.each(characters, function(indexCharacters) {
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');
        var tableFound = false;
        var tableID = "";
        _.each(rollabletables, function(indexrollabletables) {
            if(tableFound == false){
                var rollabletableName = indexrollabletables.get("name");
                var start_pos = rollabletableName.indexOf("{") + 1;
                var end_pos = rollabletableName.indexOf("}",start_pos);
                var characterIDfound = rollabletableName.substring(start_pos,end_pos);
                if(characterIDfound == characterID){tableFound = true; tableID = indexrollabletables.get("_id");};
            };
        });
        if(tableFound == false){
            var nameToUse = characterName+"{"+characterID+"}";
            createObj("rollabletable", {name: nameToUse, showplayers: false,});
            tableID = findObjs( {_type: "rollabletable", name: nameToUse})[0].get("_id");
            tableFound = true;
        };
    });
    sendChat("API", "/direct <small>Adding tables...</small>");

//Pulling the class leves on the 5E sheet, build an array all spell for each class, for each character.
    var classString;
    //roll20API.spellListClass = "";
    roll20API.spellListClass = [];
    _.each(characters, function(indexCharacters) {
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');
        classString = "";
        _.each(roll20API.spellbooks, function(indexBooks) {
            var characterSheet = getObj("character", characterID);
            var CurrentLevel = getAttrByName(characterSheet.id, indexBooks.Name) * 1;
            if(CurrentLevel > 0){classString += indexBooks.Class + ","};
        });
        classString = classString.substring(0, classString.length - 1);
        if(classString.length > 0){
            _.each(roll20API.spelllist, function(indexSpells) {
                var spellFound = false;
                var arr1 = indexSpells.Class.split(",");
                var arr2 = classString.split(",");
                for (var i = 0; i < arr1.length; i++) {
                    for (var j = 0; j < arr2.length; j++) {
                        if (arr1[i] === arr2[j]) {
                            if(spellFound == false){
                                roll20API.spellListClass.push({ID: characterID, Level: indexSpells.Level, School: indexSpells.School, Call: indexSpells.Call});
                                spellFound = true;
                            };
                        };
                    };
                };
            });
        };
    });
    sendChat("API", "/direct <small>Building spell lists...</small>");

//Overwrting any spells that maybe in the table, puts the current list of spells in the table for each character.
//Looks to reuse the same spells if they already exists and uses deprecated spells before adding new spells.
    var rollabletables = findObjs({type: "rollabletable"});
    _.each(characters, function(indexCharacters) {
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');
        _.each(rollabletables, function(indexrollabletables) {
            var rollabletableName = indexrollabletables.get("name");
            var start_pos = rollabletableName.indexOf("{") + 1;
            var end_pos = rollabletableName.indexOf("}",start_pos);
            var characterIDfound = rollabletableName.substring(start_pos,end_pos);
            if(characterIDfound == characterID){
                var tableItems = findObjs({ _type: "tableitem", _rollabletableid: indexrollabletables.get("_id")});
                if(tableItems.length != 0){
                    _.each(roll20API.spellListClass, function(indexPlayerSpells) {
                        var spellFoundAsItem = false;
                        var itemName = indexPlayerSpells.Level + "_" + indexPlayerSpells.Call;
                        _.each(tableItems, function(indextListedSpells) {
                            if(indextListedSpells.get("name") == itemName){spellFoundAsItem = true};     
                        });
                        if(spellFoundAsItem == false){
                            var checkFor999 = false;
                            _.each(tableItems, function(indextListedSpells) {
                                if(checkFor999 == false && indextListedSpells.get("name").substring(0, 3) == "999"){
                                    checkFor999 = true;
                                    spellFoundAsItem = true;
                                    var itemID = indextListedSpells.get("_id")
                                    var avatarURL = roll20API.UnkownURL;
                                    if(indexPlayerSpells.School == "Abjuration"){avatarURL = roll20API.AbjurationURL};
                                    if(indexPlayerSpells.School == "Conjuration"){avatarURL = roll20API.ConjurationURL};
                                    if(indexPlayerSpells.School == "Divination"){avatarURL = roll20API.DivinationURL};
                                    if(indexPlayerSpells.School == "Enchantment"){avatarURL = roll20API.EnchantmentURL};
                                    if(indexPlayerSpells.School == "Evocation"){avatarURL = roll20API.EvocationURL};
                                    if(indexPlayerSpells.School == "Illusion"){avatarURL = roll20API.IllusionURL};
                                    if(indexPlayerSpells.School == "Necromancy"){avatarURL = roll20API.NecromancyURL};
                                    if(indexPlayerSpells.School == "Transmutation"){avatarURL = roll20API.TransmutationURL};
                                    var itemName = indexPlayerSpells.Level + "_" + indexPlayerSpells.Call;
                                    findObjs({ _type: "tableitem", _id: itemID })[0].set({name: itemName});
                                    findObjs({ _type: "tableitem", _id: itemID })[0].set({avatar: avatarURL})
                                    findObjs({ _type: "tableitem", _id: itemID })[0].set({weight: 0})
                                };     
                            });
                        };
                        if(spellFoundAsItem == false){
                            var avatarURL = roll20API.UnkownURL;
                            if(indexPlayerSpells.School == "Abjuration"){avatarURL = roll20API.AbjurationURL};
                            if(indexPlayerSpells.School == "Conjuration"){avatarURL = roll20API.ConjurationURL};
                            if(indexPlayerSpells.School == "Divination"){avatarURL = roll20API.DivinationURL};
                            if(indexPlayerSpells.School == "Enchantment"){avatarURL = roll20API.EnchantmentURL};
                            if(indexPlayerSpells.School == "Evocation"){avatarURL = roll20API.EvocationURL};
                            if(indexPlayerSpells.School == "Illusion"){avatarURL = roll20API.IllusionURL};
                            if(indexPlayerSpells.School == "Necromancy"){avatarURL = roll20API.NecromancyURL};
                            if(indexPlayerSpells.School == "Transmutation"){avatarURL = roll20API.TransmutationURL};
                            var itemName = indexPlayerSpells.Level + "_" + indexPlayerSpells.Call;
                            if(characterID == indexPlayerSpells.ID){
                                marker = createObj("tableitem", {
                                    _rollabletableid: indexrollabletables.get("_id"),
                                    name: itemName,
                                    avatar: avatarURL,
                                    weight: 0,
                                });
                                marker=fixNewObject(marker);
                            };
                        };
                    });    
                }else{
                    _.each(roll20API.spellListClass, function(indexPlayerSpells) {
                        var avatarURL = roll20API.UnkownURL;
                        if(indexPlayerSpells.School == "Abjuration"){avatarURL = roll20API.AbjurationURL};
                        if(indexPlayerSpells.School == "Conjuration"){avatarURL = roll20API.ConjurationURL};
                        if(indexPlayerSpells.School == "Divination"){avatarURL = roll20API.DivinationURL};
                        if(indexPlayerSpells.School == "Enchantment"){avatarURL = roll20API.EnchantmentURL};
                        if(indexPlayerSpells.School == "Evocation"){avatarURL = roll20API.EvocationURL};
                        if(indexPlayerSpells.School == "Illusion"){avatarURL = roll20API.IllusionURL};
                        if(indexPlayerSpells.School == "Necromancy"){avatarURL = roll20API.NecromancyURL};
                        if(indexPlayerSpells.School == "Transmutation"){avatarURL = roll20API.TransmutationURL};
                        var itemName = indexPlayerSpells.Level + "_" + indexPlayerSpells.Call;
                        if(characterID == indexPlayerSpells.ID){
                            marker = createObj("tableitem", {
                                _rollabletableid: indexrollabletables.get("_id"),
                                name: itemName,
                                avatar: avatarURL,
                                weight: 0,
                            });
                            marker=fixNewObject(marker);
                        };
                    });
                };
            };
        });
    });
    sendChat("API", "/direct <small>Writing spells...</small>");
    
//Deprecates any extra items on the table(e.g. invalid spells that the API can not delete.)
    var rollabletables = findObjs({type: "rollabletable"});    
    _.each(characters, function(indexCharacters) {
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-'); 
        _.each(rollabletables, function(indexrollabletables) {
            var rollabletableName = indexrollabletables.get("name");
            var start_pos = rollabletableName.indexOf("{") + 1;
            var end_pos = rollabletableName.indexOf("}",start_pos);
            var characterIDfound = rollabletableName.substring(start_pos,end_pos);
            if(characterIDfound == characterID){
                var tableItems = findObjs({ _type: "tableitem", _rollabletableid: indexrollabletables.get("_id")});
                if(tableItems.length != 0){
                    _.each(tableItems, function(indextListedSpells) {
                        var validSpell = false;
                        _.each(roll20API.spellListClass, function(indexPlayerSpells) {
                            var itemName = indexPlayerSpells.Level + "_" + indexPlayerSpells.Call;
                            if(indextListedSpells.get("name") == itemName){validSpell = true};
                        });
                        if(validSpell == false){
                            var itemID = indextListedSpells.get("_id")
                            findObjs({ _type: "tableitem", _id: itemID })[0].set({name: "999_deprecated"});
                            findObjs({ _type: "tableitem", _id: itemID })[0].set({avatar: roll20API.DeprecateURL});
                            findObjs({ _type: "tableitem", _id: itemID })[0].set({weight: -1});
                        };
                    });
                };
            };
        });
    });
    sendChat("API", "/direct <small>Cleaning up the mess...</small>");
    
//Sorts the final table by item name (which is level & name with underscores.) 
    var rollabletables = findObjs({type: "rollabletable"});    
    _.each(characters, function(indexCharacters) {
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');   
        _.each(rollabletables, function(indexrollabletables) {
            var rollabletableName = indexrollabletables.get("name");
            var start_pos = rollabletableName.indexOf("{") + 1;
            var end_pos = rollabletableName.indexOf("}",start_pos);
            var characterIDfound = rollabletableName.substring(start_pos,end_pos);
            if(characterIDfound == characterID){
                var tableItems = findObjs({ _type: "tableitem", _rollabletableid: indexrollabletables.get("_id")})
            };
            roll20API.tobesorted = []
            _.each(tableItems, function(indextableItems) {
                roll20API.tobesorted.push({
                    name: indextableItems.get("name"),
                    avatar: indextableItems.get("avatar"),
                    weight: indextableItems.get("weight")});
                });
            sortedList = sortJSON(roll20API.tobesorted,"name");
            var j=0;
            _.each(tableItems, function(indextableItems) {
                var itemID = indextableItems.get("_id")
                findObjs({ _type: "tableitem", _id: itemID })[0].set({name: roll20API.tobesorted[j].name});
                findObjs({ _type: "tableitem", _id: itemID })[0].set({avatar: roll20API.tobesorted[j].avatar});
                findObjs({ _type: "tableitem", _id: itemID })[0].set({weight: roll20API.tobesorted[j].weight});
                j++
            });
        });
    });
    sendChat("API", "/direct <small>Sorting things out...</small>");
    sendChat("API", "/direct <small>Please review your spell tables and set weighting. \
    Spell item weight of '0' (zero) means the spell will NOT be added to the character record sheet. \
    Spell item weight of '1' (one) means the spell WILL BE added to the character record sheet with ability. \
    Spell item weight of '2' (two) means the spell WILL BE added to the character record sheet with ability \
    and the ability will be a token action.</small>");
    sendChat("Script Ended", "~~~~~~~~~");
};

//Updates the icons in the rollabe table to make them more readable.
updateList = function() {
    findCharacterByGraphics();
    
    var rollabletables = findObjs({type: "rollabletable"});    
    _.each(characters, function(indexCharacters) { 
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');
        _.each(rollabletables, function(indexrollabletables) {
            var rollabletableName = indexrollabletables.get("name");
            var start_pos = rollabletableName.indexOf("{") + 1;
            var end_pos = rollabletableName.indexOf("}",start_pos);
            var characterIDfound = rollabletableName.substring(start_pos,end_pos);
            if(characterIDfound == characterID){
                var tableItems = findObjs({ _type: "tableitem", _rollabletableid: indexrollabletables.get("_id")})
                var j = -1;
                var levelOfSpell = "";
                var lastLevel = "";
                _.each(tableItems, function(indextableItems) {
                    if(indextableItems.get("name") != "999_deprecated"){
                        var newAvatar = indextableItems.get("avatar");
                        var newSchool = "Unknown";
                        var givenWeight = Number(indextableItems.get("weight"));
                        var AbjurationString = roll20API.AbjurationURL + roll20API.OnAbjurationURL + roll20API.TokAbjurationURL
                        var ConjurationString = roll20API.ConjurationURL + roll20API.OnConjurationURL + roll20API.TokConjurationURL
                        var DivinationString = roll20API.DivinationURL + roll20API.OnDivinationURL + roll20API.TokDivinationURL
                        var EnchantmentString = roll20API.EnchantmentURL + roll20API.OnEnchantmentURL + roll20API.TokEnchantmentURL
                        var EvocationString = roll20API.EvocationURL + roll20API.OnEvocationURL + roll20API.TokEvocationURL
                        var IllusionString = roll20API.IllusionURL + roll20API.OnIllusionURL + roll20API.TokIllusionURL
                        var NecromancyString = roll20API.NecromancyURL + roll20API.OnNecromancyURL + roll20API.TokNecromancyURL
                        var TransmutationString = roll20API.TransmutationURL + roll20API.OnTransmutationURL + roll20API.TokTransmutationURL
                        var UnkownString = roll20API.UnkownURL + roll20API.OnUnkownURL + roll20API.TokUnkownURL
                        if(AbjurationString.indexOf(newAvatar) !== -1) {newSchool = "Abjuration";};
                        if(ConjurationString.indexOf(newAvatar) !== -1) {newSchool = "Conjuration";};
                        if(DivinationString.indexOf(newAvatar) !== -1) {newSchool = "Divination";};
                        if(EnchantmentString.indexOf(newAvatar) !== -1) {newSchool = "Enchantment";};
                        if(EvocationString.indexOf(newAvatar) !== -1) {newSchool = "Evocation";};
                        if(IllusionString.indexOf(newAvatar) !== -1) {newSchool = "Illusion";};
                        if(NecromancyString.indexOf(newAvatar) !== -1) {newSchool = "Necromancy";};
                        if(TransmutationString.indexOf(newAvatar) !== -1) {newSchool = "Transmutation";};
                        if(UnkownString.indexOf(newAvatar) !== -1) {newSchool = "Unkown";};
                        if(givenWeight == 1){givenWeight = "On";};
                        if(givenWeight == 2){givenWeight = "Tok";};
                        if(givenWeight != "On" && givenWeight != "Tok"){givenWeight = "Off";};
                        if(givenWeight == "On"){
                            if(newSchool == "Abjuration"){newAvatar = roll20API.OnAbjurationURL};
                            if(newSchool == "Conjuration"){newAvatar = roll20API.OnConjurationURL}; 
                            if(newSchool == "Divination"){newAvatar = roll20API.OnDivinationURL}; 
                            if(newSchool == "Enchantment"){newAvatar = roll20API.OnEnchantmentURL}; 
                            if(newSchool == "Evocation"){newAvatar = roll20API.OnEvocationURL}; 
                            if(newSchool == "Illusion"){newAvatar = roll20API.OnIllusionURL}; 
                            if(newSchool == "Necromancy"){newAvatar = roll20API.OnNecromancyURL}; 
                            if(newSchool == "Transmutation"){newAvatar = roll20API.OnTransmutationURL}; 
                            if(newSchool == "Unkown"){newAvatar = roll20API.OnUnkownURL};
                        };
                        if(givenWeight == "Off"){
                            if(newSchool == "Abjuration"){newAvatar = roll20API.AbjurationURL};
                            if(newSchool == "Conjuration"){newAvatar = roll20API.ConjurationURL}; 
                            if(newSchool == "Divination"){newAvatar = roll20API.DivinationURL}; 
                            if(newSchool == "Enchantment"){newAvatar = roll20API.EnchantmentURL}; 
                            if(newSchool == "Evocation"){newAvatar = roll20API.EvocationURL}; 
                            if(newSchool == "Illusion"){newAvatar = roll20API.IllusionURL}; 
                            if(newSchool == "Necromancy"){newAvatar = roll20API.NecromancyURL}; 
                            if(newSchool == "Transmutation"){newAvatar = roll20API.TransmutationURL}; 
                            if(newSchool == "Unkown"){newAvatar = roll20API.UnkownURL};
                        };
                        if(givenWeight == "Tok"){
                            if(newSchool == "Abjuration"){newAvatar = roll20API.TokAbjurationURL};
                            if(newSchool == "Conjuration"){newAvatar = roll20API.TokConjurationURL}; 
                            if(newSchool == "Divination"){newAvatar = roll20API.TokDivinationURL}; 
                            if(newSchool == "Enchantment"){newAvatar = roll20API.TokEnchantmentURL}; 
                            if(newSchool == "Evocation"){newAvatar = roll20API.TokEvocationURL }; 
                            if(newSchool == "Illusion"){newAvatar = roll20API.TokIllusionURL}; 
                            if(newSchool == "Necromancy"){newAvatar = roll20API.TokNecromancyURL}; 
                            if(newSchool == "Transmutation"){newAvatar = roll20API.TokTransmutationURL}; 
                            if(newSchool == "Unkown"){newAvatar = roll20API.TokUnkownURL}; 
                        };
                        var itemID = indextableItems.get("_id")
                        findObjs({ _type: "tableitem", _id: itemID })[0].set({avatar: newAvatar});
                    };
                });
            };
        });
    });
    sendChat("API", "/direct <small>Spell Icons have been updated. Please review before adding spells.</small>");
    sendChat("API", "/direct <small>Please review your spell tables and set weighting. \
    Red: Spell item weight of '0' (zero) means the spell will NOT be added to the character record sheet. \
    Green: Spell item weight of '1' (one) means the spell WILL BE added to the character record sheet with ability. \
    Blue: Spell item weight of '2' (two) means the spell WILL BE added to the character record sheet with ability \
    and the ability will be a token action.</small>");
    sendChat("Script Ended", "~~~~~~~~~");
};

getvalues = function() {
    findCharacterByGraphics();
    _.each(characters, function(indexCharacters) { 
        var characterID = indexCharacters[0].get("_id");
        var attributes = findObjs({type: "attribute", _characterid: characterID});
        _.each(attributes, function(indexAttributes) {
            var attName = indexAttributes.get("name")
            if(attName.indexOf("repeating") > -1){
                sendChat("API", "/direct " + indexAttributes.get("name") + ": " + indexAttributes.get("current"))
            };
       });
    });
};

//Adds Spels and Abilities to the character..
updatespell = function() {
    findCharacterByGraphics();
    
    var rollabletables = findObjs({type: "rollabletable"});    
    _.each(characters, function(indexCharacters) { 
        var characterID = indexCharacters[0].get("_id");
        var characterName = indexCharacters[0].get("name").replace(/[^a-zA-Z ]/g, "");
        characterName = characterName.split(' ').join('-');
        _.each(rollabletables, function(indexrollabletables) {
            var rollabletableName = indexrollabletables.get("name");
            var start_pos = rollabletableName.indexOf("{") + 1;
            var end_pos = rollabletableName.indexOf("}",start_pos);
            var characterIDfound = rollabletableName.substring(start_pos,end_pos);
            if(characterIDfound == characterID){
                var tableItems = findObjs({ _type: "tableitem", _rollabletableid: indexrollabletables.get("_id")})
                var j = -1;
                var levelOfSpell = "";
                var lastLevel = "";
                _.each(tableItems, function(indextableItems) {
                    if(indextableItems.get("weight") > 0){
                        levelOfSpell = indextableItems.get("name").substr(0, 1);
                        if(lastLevel != levelOfSpell){j = -1};
                        j++
                        var nameOfSpell = indextableItems.get("name").substr(2, indextableItems.get("name").length);
                        var countOfSpell = j;
                        lastLevel = levelOfSpell;
                        addSpellToSheet(levelOfSpell,nameOfSpell,countOfSpell,characterIDfound)
                    };
                });
                j = -1;
                levelOfSpell = "";
                lastLevel = "";
                var actionWeight = false;
                _.each(tableItems, function(indextableItems) {
                    if(indextableItems.get("weight") > 0){
                        levelOfSpell = indextableItems.get("name").substr(0, 1);
                        if(lastLevel != levelOfSpell){j = -1};
                        j++
                        var nameOfSpell = indextableItems.get("name").substr(2, indextableItems.get("name").length);
                        var countOfSpell = j;
                        lastLevel = levelOfSpell;
                        if(indextableItems.get("weight") > 1){
                            actionWeight = true;
                        }else{
                            actionWeight = false;
                        };
                        addAction(levelOfSpell,nameOfSpell,countOfSpell,characterIDfound,actionWeight)
                    };
                });
            };
        });
    });
    sendChat("API", "/direct <small>Spell have been added, please review.</small>");
    sendChat("Script Ended", "~~~~~~~~~");
};

addAction = function(levelOfSpell,nameOfSpell,countOfSpell,characterIDfound,actionWeight) {
    var spellData = _.findWhere(roll20API.spelllist, {Call: nameOfSpell});
    var classValue = spellData.Class;
    getCastingClassLevel(classValue,characterIDfound);
    var tokeActionValue = "";
    var spellPowerCardDescription = spellData.PowerCard;
    if(spellPowerCardDescription.length < 1 || spellPowerCardDescription == undefined){return;};
    if(spellData.Level == "0"){
        var levelTH = "Cantrip";
    }else{
        var s = ["th","st","nd","rd"], v=spellData.Level%100;
        var levelTH =  spellData.Level+(s[(v-20)%10]||s[v]||s[0]) + " Level";
    };
    var emoteText = " Cast..."
    if(spellData.Component.indexOf("V") != -1 && spellData.Component.indexOf("S") != -1){
        emoteText = " Speaking words of arcane power while making precise movement of the hand...";
    };
    if(spellData.Component.indexOf("V") != -1 && spellData.Component.indexOf("S") == -1){
        emoteText = " Speaking words of arcane power...";
    };
    if(spellData.Component.indexOf("V") == -1 && spellData.Component.indexOf("S") != -1){
        emoteText = " Makes a measure and  precise movement of the hand...";
    };
    var cardEmote = " --emote|" + emoteText + " --charid|" + characterIDfound
    var cardName = " --name|" + spellData.Name + " --txcolor|#fff" + " --txcolor|#fff"; 
    var cardSub = " --leftsub|" + spellData.CastingTime + " --rightsub|" + spellData.Range; 
    var cardLevel = " --" + levelTH + "|" + spellData.School; 
    var cardComponents = " --Components|" + spellData.Component + " " + spellData.Material; 
    var cardDuration = " --Duration|" + spellData.Duration;
    var spellPowerCardEffect = "";
    if(spellData.Effect.length > 1){spellPowerCardEffect = " --Effect|" + spellData.Effect;};
    var spellHigherLevel = "";
    if(spellData.HigherLevel.length > 1){spellHigherLevel = " --Higher Level|" + spellData.HigherLevel;};
    if(spellPowerCardDescription.length < 1 || spellPowerCardDescription == undefined){return;};
    tokeActionValue = "!power" + cardEmote + cardName + cardSub + cardLevel + cardComponents + cardDuration
    tokeActionValue = tokeActionValue + " --Description|" + spellPowerCardDescription + spellHigherLevel + spellPowerCardEffect + " " + spellData.SpellSlotLevel;
    if(tokeActionValue == ""){return;};
    if(levelOfSpell == 0){
        var abilityName = "[c]"
    }else{
        var abilityName = "[" + levelOfSpell + "]"
    };
    abilityName += "-" + nameOfSpell.split(' ').join('-');
    var abilityExists = findObjs({type: "ability", _characterid: characterIDfound, name: abilityName});
    tokeActionValue = tokeActionValue.replace(/spellcastingability/g, spellCastingAttackMod);
    if(abilityExists.length > 0 ){
       findObjs({ _type: "ability", _id: abilityExists[0].get("_id") })[0].set({description: "Spell Control Added"});
       findObjs({ _type: "ability", _id: abilityExists[0].get("_id") })[0].set({action: tokeActionValue});
       findObjs({ _type: "ability", _id: abilityExists[0].get("_id") })[0].set({istokenaction: actionWeight});
    }else{
        createObj("ability", {
            name: abilityName,
            characterid: characterIDfound,
            description: "Spell Control Added",
            action: tokeActionValue,
            istokenaction: actionWeight
        });    
    };
};

addSpellToSheet = function(levelOfSpell,nameOfSpell,countOfSpell,characterIDfound) {
    var attributeName = "";
    if(levelOfSpell == 0){
       attributeNamePre = "repeating_spellbookcantrip_" + countOfSpell + "_";
    }else{
        attributeNamePre = "repeating_spellbooklevel" + levelOfSpell + "_" + countOfSpell + "_";
    };
    
    var spellData = _.findWhere(roll20API.spelllist, {Call: nameOfSpell});
    
    //Spell Information
    var dataValue = spellData.Name;
    var attributeName = attributeNamePre + "spellname";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.School;
    var attributeName = attributeNamePre + "spellschool";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.CastingTime;
    var attributeName = attributeNamePre + "spellcasttime";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.Range;
    var attributeName = attributeNamePre + "spellrange";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.Component + spellData.Material;
    var attributeName = attributeNamePre + "spellcomponents";
    addSpellAttribute(dataValue,attributeName,characterIDfound);

    var dataValue = spellData.Duration;
    var attributeName = attributeNamePre + "spellduration";
    addSpellAttribute(dataValue,attributeName,characterIDfound);

    var dataValue = spellData.Description;
    var attributeName = attributeNamePre + "spelldescription";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.HigherLevel;
    var attributeName = attributeNamePre + "spellhighersloteffect";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.SaveSuccess;
    var attributeName = attributeNamePre + "savesuccess";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.SaveStat;
    var attributeName = attributeNamePre + "savestat";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.HealAmount;
    var attributeName = attributeNamePre + "spellhealamount";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.CritText;
    var attributeName = attributeNamePre + "spellcrittext";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.DamageMiscBonus;
    var attributeName = attributeNamePre + "damagemiscbonus";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.DamageType;
    var attributeName = attributeNamePre + "damage";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.DamageKind;
    var attributeName = attributeNamePre + "damagetype";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.EffectClean;
    var attributeName = attributeNamePre + "spelleffect";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.TargetAoE;
    var attributeName = attributeNamePre + "spelltarget";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    //Drop Downs
    var dataValue = spellData.Ritual
    if(dataValue == "N"){
        dataValue = "";
    }else{
        dataValue = "(Ritual)";
    };
    var attributeName = attributeNamePre + "spellritual";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.Concentration
    if(dataValue == "N"){
        dataValue = "";
    }else{
        dataValue = "(Concentration)";
    };
    var attributeName = attributeNamePre + "spellconcentration";
    addSpellAttribute(dataValue,attributeName,characterIDfound);
    
    //Stat Bonus
    var dataValue = spellData.Class
    var attributeName = attributeNamePre + "healstatbonus";
    statBonus(dataValue,attributeName,characterIDfound);
    
    var dataValue = spellData.Class
    var attributeName = attributeNamePre + "attackstat";
    statBonus(dataValue,attributeName,characterIDfound);
    
    if(spellData.DamageStatBonus == "0" || spellData.DamageStatBonus == 0){
        var dataValue = "0"
        var attributeName = attributeNamePre + "damagestatbonus";
        addSpellAttribute(dataValue,attributeName,characterIDfound);
    }else{
        var dataValue = spellData.Class
        var attributeName = attributeNamePre + "damagestatbonus";
        statBonus(dataValue,attributeName,characterIDfound);
    };
    
    //Save DC
    var dataValue = spellData.Class
    var attributeName = attributeNamePre + "spellsavedc";
    saveDCfunction(dataValue,attributeName,characterIDfound);
    
    //spell gained from
    var dataValue = spellData.Class
    var attributeName = attributeNamePre + "spellgainedfrom";
    gainfunction(dataValue,attributeName,characterIDfound); 
};

gainfunction = function(dataValue,attributeName,characterIDfound) {
    var statArray = [];
    _.each(roll20API.spellbooks, function(indexBooks) {
        var CurrentLevel = getAttrByName(characterIDfound, indexBooks.Name) * 1;
        if(CurrentLevel > 0){
            var givenStat = indexBooks.StatBonus;
            var statValue = 0;
            if(givenStat != "0"){
                var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: indexBooks.Stat});
                if(attributesExists.length > 0 ){
                   statValue = attributesExists[0].get("current") * 1;
                };
            };
            var classStatBouns = indexBooks.StatBonus;
            statArray.push({
                Class: indexBooks.Class, 
                ClassLevel: indexBooks.Name, 
                Level: CurrentLevel, 
                StatBonus: classStatBouns,
                Stat: indexBooks.Stat,
                StatValue: statValue,
                SaveDC: indexBooks.SaveDC,
                SaveDCValue: 8 + (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                AttackMod: (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                Gained: indexBooks.Gained
            });
        };
    });
    sortedStatArray = sortJSON(statArray,"AttackMod");
    var spellFoundByClass = false;
    var SpellRecord = 0;
    for (i = sortedStatArray.length - 1; i > -1; i = i - 1) {
        if(spellFoundByClass == false){
            if(dataValue.indexOf(sortedStatArray[i].Class) > -1 ){
                spellFoundByClass = true
                SpellRecord = i;
            };
        };
    };
    dataValue = sortedStatArray[SpellRecord].Gained
    var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: attributeName});
    if(attributesExists.length > 0 ){
       findObjs({ _type: "attribute", _id: attributesExists[0].get("_id") })[0].set({current: dataValue});
    }else{
        createObj("attribute", {
            name: attributeName,
            characterid: characterIDfound,
            current: dataValue
        });    
    };
};

saveDCfunction = function(dataValue,attributeName,characterIDfound) {
    var statArray = [];
    _.each(roll20API.spellbooks, function(indexBooks) {
        var CurrentLevel = getAttrByName(characterIDfound, indexBooks.Name) * 1;
        if(CurrentLevel > 0){
            var givenStat = indexBooks.StatBonus;
            var statValue = 0;
            if(givenStat != "0"){
                var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: indexBooks.Stat});
                if(attributesExists.length > 0 ){
                   statValue = attributesExists[0].get("current") * 1;
                };
            };
            var classStatBouns = indexBooks.StatBonus;
            statArray.push({
                Class: indexBooks.Class, 
                ClassLevel: indexBooks.Name, 
                Level: CurrentLevel, 
                StatBonus: classStatBouns,
                Stat: indexBooks.Stat,
                StatValue: statValue,
                SaveDC: indexBooks.SaveDC,
                SaveDCValue: 8 + (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                AttackMod: (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                Gained: indexBooks.Gained
            });
        };
    });
    sortedStatArray = sortJSON(statArray,"AttackMod");
    var spellFoundByClass = false;
    var SpellRecord = 0;
    for (i = sortedStatArray.length - 1; i > -1; i = i - 1) {
        if(spellFoundByClass == false){
            if(dataValue.indexOf(sortedStatArray[i].Class) > -1 ){
                spellFoundByClass = true
                SpellRecord = i;
            };
        };
    };
    dataValue = "@{" + sortedStatArray[SpellRecord].SaveDC + "}"
    var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: attributeName});
    if(attributesExists.length > 0 ){
       findObjs({ _type: "attribute", _id: attributesExists[0].get("_id") })[0].set({current: dataValue});
    }else{
        createObj("attribute", {
            name: attributeName,
            characterid: characterIDfound,
            current: dataValue
        });    
    };
};

statBonus = function(dataValue,attributeName,characterIDfound) {
    var statArray = [];
    _.each(roll20API.spellbooks, function(indexBooks) {
        var CurrentLevel = getAttrByName(characterIDfound, indexBooks.Name) * 1;
        if(CurrentLevel > 0){
            var givenStat = indexBooks.StatBonus;
            var statValue = 0;
            if(givenStat != "0"){
                var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: indexBooks.Stat});
                if(attributesExists.length > 0 ){
                   statValue = attributesExists[0].get("current") * 1;
                };
            };
            var classStatBouns = indexBooks.StatBonus;
            statArray.push({
                Class: indexBooks.Class, 
                ClassLevel: indexBooks.Name, 
                Level: CurrentLevel, 
                StatBonus: classStatBouns,
                Stat: indexBooks.Stat,
                StatValue: statValue,
                SaveDC: indexBooks.SaveDC,
                SaveDCValue: 8 + (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                AttackMod: (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                Gained: indexBooks.Gained
            });
        };
    });
    sortedStatArray = sortJSON(statArray,"AttackMod");
    var spellFoundByClass = false;
    var SpellRecord = 0;
    for (i = sortedStatArray.length - 1; i > -1; i = i - 1) {
        if(spellFoundByClass == false){
            if(dataValue.indexOf(sortedStatArray[i].Class) > -1 ){
                spellFoundByClass = true
                SpellRecord = i;
            };
        };
    };
    dataValue = "@{" + sortedStatArray[SpellRecord].StatBonus + "}"
    var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: attributeName});
    if(attributesExists.length > 0 ){
       findObjs({ _type: "attribute", _id: attributesExists[0].get("_id") })[0].set({current: dataValue});
    }else{
        createObj("attribute", {
            name: attributeName,
            characterid: characterIDfound,
            current: dataValue
        });    
    };
};

addSpellAttribute = function(dataValue,attributeName,characterIDfound) {
    var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: attributeName});
    if(attributesExists.length > 0 ){
       findObjs({ _type: "attribute", _id: attributesExists[0].get("_id") })[0].set({current: dataValue});
    }else{
        createObj("attribute", {
            name: attributeName,
            characterid: characterIDfound,
            current: dataValue
        });    
    };
};

addTokenAction = function(dataValue,actionName,characterIDfound) {
    var actionExists = findObjs({type: "ability", _characterid: characterIDfound, name: actionName});
    if(actionExists.length > 0 ){
       findObjs({ _type: "ability", _id: actionExists[0].get("_id") })[0].set({action: dataValue});
    }else{
        createObj("ability", {
            name: actionName,
            characterid: characterIDfound,
            action: dataValue
        });    
    };
};

getCastingClassLevel = function(classValue,characterIDfound) {
    var statArray = [];
    _.each(roll20API.spellbooks, function(indexBooks) {
        var CurrentLevel = getAttrByName(characterIDfound, indexBooks.Name) * 1;
        if(CurrentLevel > 0){
            var givenStat = indexBooks.StatBonus;
            var statValue = 0;
            if(givenStat != "0"){
                var attributesExists = findObjs({type: "attribute", _characterid: characterIDfound, name: indexBooks.Stat});
                if(attributesExists.length > 0 ){
                   statValue = attributesExists[0].get("current") * 1;
                };
            };
            var classStatBouns = indexBooks.StatBonus;
            statArray.push({
                Class: indexBooks.Class, 
                ClassLevel: indexBooks.Name, 
                Level: CurrentLevel, 
                StatBonus: classStatBouns,
                Stat: indexBooks.Stat,
                StatValue: statValue,
                SaveDC: indexBooks.SaveDC,
                SaveDCValue: 8 + (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                AttackMod: (Math.round((5 + CurrentLevel) / 4)) + (Math.floor((statValue / 2) - 5)),
                Gained: indexBooks.Gained
            });
        };
    });
    sortedStatArray = sortJSON(statArray,"AttackMod");
    var spellFoundByClass = false;
    var SpellRecord = 0;
    for (i = sortedStatArray.length - 1; i > -1; i = i - 1) {
        if(spellFoundByClass == false){
            if(classValue.indexOf(sortedStatArray[i].Class) > -1 ){
                spellFoundByClass = true
                SpellRecord = i;
            };
        };
    };
    spellCastingClassLevel = sortedStatArray[SpellRecord].ClassLevel
    spellCastingAttackMod = sortedStatArray[SpellRecord].StatBonus
};