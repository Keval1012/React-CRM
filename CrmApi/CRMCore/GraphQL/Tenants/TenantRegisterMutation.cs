using CRMCore.Application.Dto.Tenants;
using CRMCore.Application.Interface.Tenants;
using CRMCore.EntityFrameWorkCore.Model.Tenants;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Mvc;

namespace CRMCore.Web.GraphQL.Tenants
{
    [ExtendObjectType("Mutation")]
    public class TenantRegisterMutation
    {
        public Tenant RegisterTenant([Service] ITenantRegisterRepository ITenantRegister, TenantVerificationVM tenant)
        {
            return ITenantRegister.RegisterTenant(tenant);
        }

        public async Task<bool> VerifyEmail([Service] ITenantRegisterRepository ITenantRegister, int id)
        {
            var isVerified = await ITenantRegister.VerifyEmailAsync(id);
            if (isVerified)
            {
                return true;
            }
            else
            {
                //throw new QueryException(
                //    ErrorBuilder.New()
                //        .SetMessage("Invalid verify Tenant.")
                //        .Build()
                //);
                return false;
            }
        }
    }
}
