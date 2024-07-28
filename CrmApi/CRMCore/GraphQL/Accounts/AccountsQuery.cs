using CRMCore.Application.Dto.Accounts;
using CRMCore.Application.Interface.Accounts;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Accounts
{
    [ExtendObjectType("Query")]
    public class AccountsQuery
    {
        public IEnumerable<AccountVM> GetAccounts([Service] IAccountRepository IAccount)
        {
            return IAccount.GetAccounts().ToList();
        }

        public IEnumerable<AccountVM> GetAccountsByTenant([Service] IAccountRepository IAccount, [Required] int tenantId)
        {
            return IAccount.GetAccountsByTenant(tenantId).ToList();
        }

        public IEnumerable<AccountVM> GetAccountsByTenantAdmin([Service] IAccountRepository IAccount, [Required] int tenantId)
        {
            return IAccount.GetAccountsByTenantAdmin(tenantId).ToList();
        }

        public IEnumerable<AccountVM> GetAccountsByUser([Service] IAccountRepository IAccount, [Required] int userId)
        {
            return IAccount.GetAccountsByUser(userId).ToList();
        }
    }
}
