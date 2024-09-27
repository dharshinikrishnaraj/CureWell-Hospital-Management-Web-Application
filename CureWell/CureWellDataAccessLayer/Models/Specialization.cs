using System;
using System.Collections.Generic;

namespace CureWellDataAccessLayer.Models;

public partial class Specialization
{
    public string SpecializationCode { get; set; } = null!;

    public string SpecializationName { get; set; } = null!;

    public virtual ICollection<DoctorSpecialization> DoctorSpecializations { get; set; } = new List<DoctorSpecialization>();

    public virtual ICollection<Surgery> Surgeries { get; set; } = new List<Surgery>();
}
