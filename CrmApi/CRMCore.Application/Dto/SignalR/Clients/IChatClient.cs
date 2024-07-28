namespace CRMCore.Application.Dto.SignalR.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}