using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class ViewHub : Hub
{
    public static int ViewCount {get;set;} = 0;

    public async Task NotifyWatching(){
        ViewCount++;
        await this.Clients.All.SendAsync("viewCountUpdate", ViewCount);
    }

    public string GetFullName(string firstName, string lastName){
        return $"{firstName} {lastName}";
    }

    public Task IncrementServerView()
    {
        ViewCount++;
        return Clients.All.SendAsync("incrementView", ViewCount);
    }

     public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public Task TriggerGroup(string groupName)
    {
        return Clients.Group(groupName).SendAsync("TriggerColor", groupName);
    }
}