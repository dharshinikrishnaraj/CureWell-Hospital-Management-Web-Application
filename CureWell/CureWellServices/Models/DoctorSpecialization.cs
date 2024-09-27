namespace CureWellServices.Models
{
    public class DoctorSpecialization
    {
        public int DoctorId { get; set; }

        public string SpecializationCode { get; set; } = null!;

        public DateOnly SpecializationDate { get; set; }

        
    }
}
