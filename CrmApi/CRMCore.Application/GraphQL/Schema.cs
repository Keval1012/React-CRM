using HotChocolate.Types;

namespace CRMCore.Application.GraphQL
{
    public class Query
    {
        public string Hello() => "Hello World";

        public BookData GetBook() =>
        new BookData
        {
            Title = "C# in depth.",
            Author = new Author
            {
                Name = "Jon Skeet"
            }
        };
    }

    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Field(q => q.Hello()).Type<StringType>().Name("hello");
        }
    }
}
