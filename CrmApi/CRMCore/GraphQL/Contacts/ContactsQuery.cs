using ClosedXML.Excel;
using CRMCore.Application.Dto.Contacts;
using CRMCore.Application.Dto.ImportExport;
using CRMCore.Application.Interface.Contacts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Contacts
{
    [ExtendObjectType("Query")]
    public class ContactsQuery
    {
        //[UseProjection]
        //[UseFiltering]
        //[UseSorting]
        public IEnumerable<ContactVM> GetContacts([Service] IContactRepository IContact)
        {
            return IContact.GetContacts().ToList();
        }

        public IEnumerable<ContactVM> GetContactsByTenant([Service] IContactRepository IContact, [Required] int tenantId)
        {
            return IContact.GetContactsByTenant(tenantId).ToList();
        }

        public IEnumerable<ContactVM> GetContactsByTenantAdmin([Service] IContactRepository IContact, [Required] int tenantId)
        {
            return IContact.GetContactsByTenantAdmin(tenantId).ToList();
        }

        public IEnumerable<ContactVM> GetContactsByUser([Service] IContactRepository IContact, [Required] int userId)
        {
            return IContact.GetContactsByUser(userId).ToList();
        }

        public async Task<ExportExcelResponse> GetContactExcelFile([Service] IContactRepository IContact, int? tenantId = null, int? tenantAdminId = null, int? userId = null)
        {
            var response = new ExportExcelResponse();

            IEnumerable<ContactVM> contact;

            if (tenantId != null)
            {
                contact = IContact.GetContactsByTenant(tenantId.Value).ToList();
            }
            else if (tenantAdminId != null)
            {
                contact = IContact.GetContactsByTenantAdmin(tenantAdminId.Value).ToList();
            }
            else if (userId != null)
            {
                contact = IContact.GetContactsByUser(userId.Value).ToList();
            }
            else
            {
                contact = IContact.GetContacts().ToList();
            }

            string base64String;
            using (var wb = new XLWorkbook())
            {
                var sheet = wb.Worksheets.Add("Contacts");

                sheet.Cell(1, 1).Value = "   " + "Full name";
                sheet.Cell(1, 2).Value = "   " + "Account";
                sheet.Cell(1, 3).Value = "   " + "Type";
                sheet.Cell(1, 4).Value = "   " + "Email";
                sheet.Cell(1, 5).Value = "   " + "Mobile number";
                sheet.Cell(1, 6).Value = "   " + "Country";

                var headerRange = sheet.Range("A1:F1");
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Font.FontColor = XLColor.White;
                headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#2276e3");

                sheet.Column(1).Width = 45;
                sheet.Column(2).Width = 35;
                sheet.Column(3).Width = 25;
                sheet.Column(4).Width = 25;
                sheet.Column(5).Width = 25;
                sheet.Column(6).Width = 35;

                //sheet.Columns().AdjustToContents();

                int rowIndex = 2;
                foreach (var employee in contact)
                {
                    sheet.Cell(rowIndex, 1).Value = "   " + employee.ContactName;
                    sheet.Cell(rowIndex, 2).Value = "   " + employee.Account;
                    sheet.Cell(rowIndex, 3).Value = "   " + employee.ContactTypes?.Type;
                    sheet.Cell(rowIndex, 4).Value = "   " + employee.Email;
                    sheet.Cell(rowIndex, 5).Value = "   " + employee.MobileNumber;
                    sheet.Cell(rowIndex, 6).Value = "   " + employee.Country;
                    rowIndex++;
                }

                using (var ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    base64String = Convert.ToBase64String(ms.ToArray());
                }
            }

            response.Code = 200;
            response.Status = true;
            response.Message = "Contact File has been Exported !!!";
            response.FileName = "Contacts.xlsx";
            response.Data = base64String;

            return response;
        }
    }
}
