using System;
using System.Collections.Generic;

namespace CureWellDataAccessLayer.Models;

public partial class DoctorSpecialization
{
    public int DoctorId { get; set; }

    public string SpecializationCode { get; set; } = null!;

    public DateOnly SpecializationDate { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;

    public virtual Specialization SpecializationCodeNavigation { get; set; } = null!;
}
