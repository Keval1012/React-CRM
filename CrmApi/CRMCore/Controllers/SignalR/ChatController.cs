using CRMCore.Application.Dto.SignalR.Clients;
using CRMCore.Application.Dto.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CRMCore.Web.Controllers.SignalR
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpPost("Messages")]
        public async Task Post(ChatMessage message)
        {

            await _chatHub.Clients.All.ReceiveMessage(message);
        }
    }
}