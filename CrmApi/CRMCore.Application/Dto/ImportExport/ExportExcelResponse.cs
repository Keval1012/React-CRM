namespace CRMCore.Application.Dto.ImportExport
{
    public class ExportExcelResponse
    {
        public int? Code { get; set; }
        public bool? Status { get; set; }
        public string Message { get; set; }
        public string? FileName { get; set; }
        public string? Data { get; set; }
    }
}
