import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, Players, Inventory, LeaderBoard, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, Timers, TeamsBalancer, Build, AreaService, AreaPlayerTriggerService, AreaViewService } from 'pixel_combats/room';

let AdminPlayersIDs = []; 
let BannedPlayersIDs = [];

Damage.GetContext().DamageOut.Value = true;
Damage.GetContext().FriendlyFire.Value = true;
BreackGraph.OnlyPlayerBlocksDmg = false;

Teams.Add('Players', '<b><i>Наблюдатели</i></b> \n <b><i>Строители</i></b>', new Color(0, 0, 0, 0));
const Team = Teams.Get('Players');
Team.Spawns.SpawnPointsGroups.Add(1);
Team.Build.BlocksSet.Value = BuildBlocksSet.Blue;

LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader('Kills', '<b><i>Киллы</i></b>', '<b><i>Киллы</i></b>'),
  new DisplayValueHeader('Deaths', '<b><i>Смерти</i></b>', '<b><i>Смерти</i></b>'),
  new DisplayValueHeader('Status', '<b><i>Статус</i></b>', '<b><i>Статус</i></b>'),
  new DisplayValueHeader('RoomID', '<b><i>Room ID</i></b>', '<b><i>Room ID</i></b>'),
];

// События
function e_join(p) {
    JQUtils.pcall(function () {
        if (p.Team == null) {
            if (p.IdInRoom == 1 || p.Id == ADMIN) API.Properties.GetContext().Get("team" + p.Id).Value = "builders";
            p.Properties.Get("banned").Value = API.Properties.GetContext().Get("banned" + p.Id).Value || false;
            p.Properties.Get("rid").Value = p.IdInRoom;
            let team = API.Properties.GetContext().Get("team" + p.Id).Value || "players";
            API.Teams.Get(team).Add(p);
        }

        p.OnIsOnline.Add(function () {
            API.room.PopUp(p.IsOnline);
        })
    }, true);
}

API.Teams.OnRequestJoinTeam.Add(e_join);
API.Players.OnPlayerConnected.Add(function (p) {
    JQUtils.pcall(function () {
        if (p.Team == null) {
            if (p.IdInRoom == 1 || p.Id == ADMIN) API.Properties.GetContext().Get("team" + p.Id).Value = "builders";
            p.Properties.Get("banned").Value = API.Properties.GetContext().Get("banned" + p.Id).Value || false;
            p.Properties.Get("rid").Value = p.IdInRoom;
            let team = API.Properties.GetContext().Get("team" + p.Id).Value || "players";
            API.Teams.Get(team).Add(p);
            let tim = p.Timers.Get("g");
            tim.RestartLoop(1);
        }
    }, true);
});

API.Teams.OnPlayerChangeTeam.Add(function (p) {
    if (p.Properties.Get("banned").Value) {
        p.Spawns.Despawn();
        p.PopUp("Ты ЗАБАНЕН");
    }
    else {
        p.Spawns.Spawn();
        p.Spawns.Spawn();
        p.PopUp("Этот режим находится в разработке...");
    }
});

API.Players.OnPlayerDisconnected.Add(function (p) {
    API.Properties.GetContext().Get("banned" + p.Id).Value = p.Properties.Get("banned").Value;
    if (tick == 0) JQUtils.JQTimer(tickrate, 0.05);
});

API.Teams.OnAddTeam.Add(function (t) {
    let bl = t.Id == "players" ? false : true;
    API.Build.GetContext(t).Pipette.Value = bl;
    API.Build.GetContext(t).FloodFill.Value = bl;
    API.Build.GetContext(t).FillQuad.Value = bl;
    API.Build.GetContext(t).RemoveQuad.Value = bl;
    API.Build.GetContext(t).BalkLenChange.Value = bl;
    API.Build.GetContext(t).SetSkyEnable.Value = bl;
    API.Build.GetContext(t).GenMapEnable.Value = bl;
    API.Build.GetContext(t).ChangeCameraPointsEnable.Value = bl;
    API.Build.GetContext(t).QuadChangeEnable.Value = bl;
    API.Build.GetContext(t).BuildModeEnable.Value = bl;
    API.Build.GetContext(t).RenameMapEnable.Value = bl;
    API.Build.GetContext(t).ChangeMapAuthorsEnable.Value = bl;
    API.Build.GetContext(t).LoadMapEnable.Value = bl;
    API.Build.GetContext(t).ChangeSpawnsEnable.Value = bl;
    API.Build.GetContext(t).BuildRangeEnable.Value = bl;
    API.Inventory.GetContext(t).Main.Value = bl;
    API.Inventory.GetContext(t).MainInfinity.Value = bl;
    API.Inventory.GetContext(t).Secondary.Value = bl;
    API.Inventory.GetContext(t).SecondaryInfinity.Value = bl;
    API.Inventory.GetContext(t).Melee.Value = bl;
    API.Inventory.GetContext(t).BuildInfinity.Value = bl;
    API.Inventory.GetContext(t).Build.Value = bl;
    API.Inventory.GetContext(t).Explosive.Value = bl;
    API.Inventory.GetContext(t).ExplosiveInfinity.Value = bl;
});

HintTeam.Properties.Get("hint").Value = `<B><color=${COLORS[Math.floor(Math.random() * (COLORS.length - 1))]}>SC</color>GM</B><i>\n\nby qupe</i>`;

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
