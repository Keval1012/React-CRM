using CRMCore.Application.Dto.Accounts;
using CRMCore.Application.Interface.Accounts;
using CRMCore.EntityFrameWorkCore;
using CRMCore.EntityFrameWorkCore.Model.Accounts;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Accounts
{
    [ExtendObjectType("Mutation")]
    public class AccountsMutation
    {
        public Account AddOrUpdateAccount([Service] IAccountRepository IAccount, AccountVM account)
        {
            if (account.Id == 0)
            {
                return IAccount.AddAccount(account);
            }
            return IAccount.UpdateAccount(account);
        }

        public bool DeleteAccount([Service] IAccountRepository IAccount, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var account = db.Accounts.Where(a => a.Id == id).ToList();
            if (account.Count != 0)
            {
                IAccount.DeleteAccount(id);
                return true;
            }
            return false;
        }
    }
}
