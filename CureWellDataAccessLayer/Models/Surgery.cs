using System;
using System.Collections.Generic;

namespace CureWellDataAccessLayer.Models;

public partial class Surgery
{
    public int SurgeryId { get; set; }

    public int? DoctorId { get; set; }

    public DateOnly SurgeryDate { get; set; }

    public decimal StartTime { get; set; }

    public decimal EndTime { get; set; }

    public string? SurgeryCategory { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Specialization? SurgeryCategoryNavigation { get; set; }
}
