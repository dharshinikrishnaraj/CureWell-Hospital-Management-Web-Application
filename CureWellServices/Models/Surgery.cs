namespace CureWellServices.Models
{
    public class Surgery
    {
        public int SurgeryId { get; set; }

        public int? DoctorId { get; set; }

        public DateOnly SurgeryDate { get; set; }

        public decimal StartTime { get; set; }

        public decimal EndTime { get; set; }

        public string? SurgeryCategory { get; set; }

    }
}
