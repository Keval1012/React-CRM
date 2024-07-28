using CRMCore.Application.Dto.SignalR.Clients;
using Microsoft.AspNetCore.SignalR;

namespace CRMCore.Application.Dto.SignalR
{
    public class ChatHub : Hub<IChatClient> { }
}