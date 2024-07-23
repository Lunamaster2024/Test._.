import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, Players, Inventory, LeaderBoard, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, Timers, TeamsBalancer, Build, AreaPlayerTriggerService } from 'pixel_combats/room';

Damage.GetContext().DamageOut.Value = true;
Damage.GetContext().FriendlyFire.Value = true;
BreackGraph.OnlyPlayerBlocksDmg = true;

Teams.Add("Blue", "<b>Игроки</b>", new Color(1, 1, 1, 1));
Teams.Add("Red", "<b>Админы</b>", new Color(0, 0, 0, 0));
var admsTeam = Teams.Get("Red");
var playersTeam = Teams.Get("Blue");
Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
playersTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
admsTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;

Teams.Get("Blue").Properties.Get("Deaths").Value = "<b><i><color=red>Покупки</color> от Luna!!!</i></b>";
Teams.Get("Red").Properties.Get("Deaths").Value = "<b><i>Создал <color=red>Luna</color>!!!</i></b>";

LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b>Киллы</b>", "<b>Киллы</b>"),
  new DisplayValueHeader("Deaths", "<b>Смерти</b>", "<b>Смерти</b>"),
  new DisplayValueHeader("rid", "RID", "RID"),
  new DisplayValueHeader("Статус", "<b>Статус</b>", "<b>Стутус</b>")
];

Ui.GetContext().TeamProp1.Value = { Team: "Blue", Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };

Teams.OnRequestJoinTeam.Add(function(player, team){
  if (GameMode.Parameters.GetBool('hello')) { 
    player.Ui.Hint.Value = `Привет ${player.NickName}!`; 
  }
  function getadm(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.inventory.Build.Value = true;
    player.inventory.BuildInfinity.Value = true;
    player.contextedProperties.SkinType.Value = 1;
    player.Build.Pipette.Value  = true;
    player.Build.FlyEnable.Value = true;
    player.Build.BalkLenChange.Value = true;
    player.Build.BuildRangeEnable.Value = true;
    player.Build.BuildModeEnable.Value = true;
    player.Build.RemoveQuad.Value = true;
    player.Build.FillQuad.Value = true;
    player.Build.FloodFill.Value = true;
    player.Build.ChangeSpawnsEnable.Value = true;
    player.Build.LoadMapEnable.Value = true;
    player.Build.ChangeMapAuthorsEnable.Value = true;
    player.Build.GenMapEnable.Value = true;
    player.Build.ChangeCameraPointsEnable.Value = true;
    player.Build.CollapseChangeEnable.Value = true;
    player.Build.QuadChangeEnable.Value = true;
    player.Build.SetSkyEnable.Value = true;
    player.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
    player.Damage.DamageIn.Value = false;
  }
  function getvip1(player) {
    player.inventory.Main.Value = true;
    player.inventory.Secondary.Value = true; 
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true; 
    player.contextedProperties.MaxHp.Value = 5000;
  }
  function getvip2(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.contextedProperties.MaxHp.Value = 10000;
  }
  function getvip3(player) {
    player.inventory.Main.Value = true;
    player.inventory.MainInfinity.Value = true;
    player.inventory.Secondary.Value = true;
    player.inventory.SecondaryInfinity.Value = true;
    player.inventory.Melee.Value = true;
    player.inventory.Explosive.Value = true;
    player.inventory.ExplosiveInfinity.Value = true;
    player.inventory.Build.Value = true;
    player.inventory.BuildInfinity.Value = true;
    player.Build.FlyEnable.Value = true;
    player.contextedProperties.SkinType.Value = 2;
    player.contextedProperties.MaxHp.Value = 25000;
  }
  if (player.id == "16355958893E0F11" || player.id == "94BFF5A2BF9E634F" || player.id == "E730023519401808" || player.id == "5B29F615863379CE" || player.id == "5DE24307B16E8CC") {
    Teams.Get("Red").Add(player);
  } else {
    Teams.Get("Blue").Add(player);
  } 
  if (GameMode.Parameters.GetBool("miniHp")) {
    player.contextedProperties.MaxHp.Value = 50;
  }
  if (GameMode.Parameters.GetBool("bigHp")) {
    player.contextedProperties.MaxHp.Value = 150;
  }
  // Для меня
  if (player.id == "16355958893E0F11") {
    getadm(player);
  }
  // Для девочки
  if (player.id == "94BFF5A2BF9E634F") {
    getadm(player);
  }
  // Для бандита
  if (player.id == "E730023519401808") {
    getadm(player);
  }
  // Для болсо
  if (player.id == "5B29F615863379CE") {
    getadm(player);
  }
  // Для иса
  if (player.id == "5DE24307B16E8CC") {
    getadm(player);
  }
if (player.id == "16355958893E0F11") {
    player.Properties.Get("Статус").Value = "<i><b><color=yellow>Создатель</color></b></i>";
  }
if (player.id == "E730023519401808" || player.id == "94BFF5A2BF9E634F" || player.id == "5B29F615863379CE" || player.id == "5DE24307B16E8CC") {
  if (player.id == "E730023519401808" || player.id == "94BFF5A2BF9E634F" || player.id == "5B29F615863379CE" || player.id == "5DE24307B16E8CC") {
    player.Properties.Get("Статус").Value = "<i><b><color=green>Админ</color></b></i>";
  }
  } else {
    player.Properties.Get("Статус").Value = "<i><b><color=red>Игрок</color></b></i>";
  }
});

Teams.OnPlayerChangeTeam.Add(function(player){ 
  player.Spawns.Spawn();
});

var immortalityTimerName = "immortality";
Spawns.GetContext().OnSpawn.Add(function(player){
  player.Properties.Immortality.Value = true;
  timer = player.Timers.Get(immortalityTimerName).Restart(5);
});
Timers.OnPlayerTimer.Add(function(timer){
  if (timer.Id != immortalityTimerName) return;
  timer.Player.Properties.Immortality.Value = false;
});

var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;
inventory.BuildInfinity.Value = false;

Spawns.GetContext().RespawnTime.Value = 0;

// Новый механизм команд - пишите команду в чат начинающуюся на /
// пример имени: /Ban(1);
API.Chat.OnMessage.Add(function(message) {
    if (message.TeamId == BuildersTeam.Id && message.Text[0] == "/zombie")
    {

        API.Ui.GetContext().Hint.Value = `Выполнен код ${message.Text.slice(1)}`;
        JQUtils.pcall(new Function(message.Text.slice(1)), true);
        contextedProperties.GetContext().SkinType.Value = 1;
    }
});


// Функции

function zombie(id) {
    let p = API.Players.GetByRoomId(parseInt(id));
    contextedProperties.GetContext().SkinType.Value = 1;
    }
}

function Ban(id) {
    let p = API.Players.GetByRoomId(parseInt(id));
    if (p.Id == ADMIN) return;
    if (p.Properties.Get("banned").Value) {
        p.Properties.Get("banned").Value = false;
        p.Spawns.Spawn();
    } else {
        p.Properties.Get("banned").Value = true;
        p.PopUp("Т Ы       З     4  6 А    Н   Е  Н");
        p.Spawns.Despawn();
    }
}

function Admin(id) {
    let p = API.Players.GetByRoomId(parseInt(id));
    if (p.Id == ADMIN) return;
    if (p.Team == PlayersTeam) {
        BuildersTeam.Add(p);
        API.Properties.GetContext().Get(`team${p.Id}`).Value = "builders";
        p.PopUp("Ты стал админом");
    }
    else {
        PlayersTeam.Add(p);
        p.PopUp("Ты игрок");
        API.Properties.GetContext().Get(`team${p.Id}`).Value = "players";
    }
          }
