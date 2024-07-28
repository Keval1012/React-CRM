using ClosedXML.Excel;
using CRMCore.Application.Dto.ImportExport;
using CRMCore.Application.Interface.Accounts;
using CRMCore.Application.Interface.Contacts;
using CRMCore.Application.Interface.Leads;
using CRMCore.Application.Interface.Opportunities;
using CRMCore.Application.Interface.Roles;
using CRMCore.Application.Interface.Tasks;
using CRMCore.Application.Interface.Tenants;
using CRMCore.Application.Interface.Users;

namespace CRMCore.Web.GraphQL.ImportExcelFile
{
    [ExtendObjectType("Query")]
    public class SampleDataQuery
    {
        public async Task<ExportExcelResponse> GetSampleData(string Module,
            [Service] IContactRepository IContact,
            [Service] IAccountRepository IAccount,
            [Service] ITaskRepository ITask,
            [Service] ILeadRepository ILead,
            [Service] IOpportunityRepository IOpportunity,
            [Service] IUserRepository IUser,
            [Service] ITenantRepository ITenant,
            [Service] IRoleRepository IRole
        )
        {
            var response = new ExportExcelResponse();

            string base64String;
            using (var wb = new XLWorkbook())
            {
                if (Module == "Contact") IContact.GetSampleDataByContact(wb);
                else if (Module == "Account") IAccount.GetSampleDataByAccount(wb);
                else if (Module == "Task") ITask.GetSampleDataByTask(wb);
                else if (Module == "Lead") ILead.GetSampleDataByLead(wb);
                else if (Module == "Opportunity") IOpportunity.GetSampleDataByOpportunity(wb);
                else if (Module == "User") IUser.GetSampleDataByUser(wb);
                else if (Module == "Tenant") ITenant.GetSampleDataByTenant(wb);
                else if (Module == "Role") IRole.GetSampleDataByUserRole(wb);
                else response.Message = "Invalid Module !!!";

                using (var ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    base64String = Convert.ToBase64String(ms.ToArray());
                }
            }

            response.Code = 200;
            response.Status = true;
            response.Message = $"Sample {Module} data has been downloaded !!!";
            response.FileName = $"{Module}.xlsx";
            response.Data = base64String;

            return response;
        }
    }
}
