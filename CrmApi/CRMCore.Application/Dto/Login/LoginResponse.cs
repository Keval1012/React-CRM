using CRMCore.EntityFrameWorkCore.Model.Tenants;
using CRMCore.EntityFrameWorkCore.Model.Users;

namespace CRMCore.Application.Dto.Login
{
    public class LoginResponse
    {
        public bool IsAuthenticated { get; set; }
        public string? Token { get; set; }
        public string Message { get; set; }
        public User? UserInfo { get; set; }
        public Tenant? TenantInfo { get; set; }
    }
}
