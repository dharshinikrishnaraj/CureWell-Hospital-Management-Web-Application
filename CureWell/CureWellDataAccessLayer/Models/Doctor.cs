using System;
using System.Collections.Generic;

namespace CureWellDataAccessLayer.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public string DoctorName { get; set; } = null!;

    public virtual ICollection<DoctorSpecialization> DoctorSpecializations { get; set; } = new List<DoctorSpecialization>();

    public virtual ICollection<Surgery> Surgeries { get; set; } = new List<Surgery>();
}
