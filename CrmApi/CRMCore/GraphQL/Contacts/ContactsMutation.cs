using CRMCore.Application.Dto.Contacts;
using CRMCore.Application.Interface.Contacts;
using CRMCore.EntityFrameWorkCore.Model.Contacts;
using CRMCore.EntityFrameWorkCore;
using System.ComponentModel.DataAnnotations;

namespace CRMCore.Web.GraphQL.Contacts
{
    [ExtendObjectType("Mutation")]
    public class ContactsMutation
    {
        public Contact AddOrUpdateContact([Service] IContactRepository IContact, ContactVM contact)
        {
            if (contact.Id == 0)
            {
                return IContact.AddContact(contact);
            }
            return IContact.UpdateContact(contact);
        }

        public bool DeleteContact([Service] IContactRepository IContact, [Service] CRMCoreDbContext db, [Required] int id)
        {
            var contact = db.Contacts.Where(a => a.Id == id).ToList();
            if (contact.Count != 0)
            {
                IContact.DeleteContact(id);
                return true;
            }
            return false;
        }
    }
}
