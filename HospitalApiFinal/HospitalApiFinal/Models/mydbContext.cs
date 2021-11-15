using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HospitalApiFinal.Models
{
    public partial class mydbContext : DbContext
    {
        public mydbContext()
        {
        }

        public mydbContext(DbContextOptions<mydbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<App> Apps { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<Test> Tests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LTILBOM20401541\\TESTSQLSERVER;Database=mydb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.Loginid)
                    .HasName("PK__admin__1F5DF0A745D81E34");

                entity.ToTable("admin");

                entity.Property(e => e.Loginid)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("loginid");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<App>(entity =>
            {
                entity.HasKey(e => e.Aid)
                    .HasName("PK__app__DE508E2E059094AB");

                entity.ToTable("app");

                entity.Property(e => e.Aid).HasColumnName("aid");

                entity.Property(e => e.Adate)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("adate");

                entity.Property(e => e.Adesc)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("adesc");

                entity.Property(e => e.Atime)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("atime");

                entity.Property(e => e.Did).HasColumnName("did");

                entity.Property(e => e.PatientId).HasColumnName("patient_id");

                entity.HasOne(d => d.DidNavigation)
                    .WithMany(p => p.Apps)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("FK__app__did__4E88ABD4");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Apps)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK__app__patient_id__4D94879B");
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.HasKey(e => e.Did)
                    .HasName("PK__doctor__D877D216C75BF156");

                entity.ToTable("doctor");

                entity.HasIndex(e => e.Dmobile, "UQ__doctor__6B4391D3A8A9D547")
                    .IsUnique();

                entity.HasIndex(e => e.Demaildid, "UQ__doctor__92B26C04D6EA5D27")
                    .IsUnique();

                entity.Property(e => e.Did).HasColumnName("did");

                entity.Property(e => e.Dage)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dage");

                entity.Property(e => e.Dcity)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dcity");

                entity.Property(e => e.Demaildid)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("demaildid");

                entity.Property(e => e.Dexp)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dexp");

                entity.Property(e => e.Dgender)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("dgender");

                entity.Property(e => e.Dmobile)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("dmobile");

                entity.Property(e => e.Dname)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dname");

                entity.Property(e => e.Dpassword)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("dpassword");

                entity.Property(e => e.Dspecalization)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("dspecalization");

                entity.Property(e => e.Dstate)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dstate");

                entity.Property(e => e.PatientId).HasColumnName("patient_id");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Doctors)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK__doctor__patient___38996AB5");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.ToTable("patient");

                entity.HasIndex(e => e.Emailid, "UQ__patient__8734520B17D9F8B1")
                    .IsUnique();

                entity.HasIndex(e => e.Mobile, "UQ__patient__A32E2E1C51A35566")
                    .IsUnique();

                entity.Property(e => e.PatientId).HasColumnName("patient_id");

                entity.Property(e => e.Age)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("age");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("city");

                entity.Property(e => e.Emailid)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("emailid");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("gender");

                entity.Property(e => e.Mobile)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("mobile");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("state");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.HasKey(e => e.Tid)
                    .HasName("PK__test__DC105B0FC45A55C3");

                entity.ToTable("test");

                entity.Property(e => e.Tid)
                    .ValueGeneratedNever()
                    .HasColumnName("tid");

                entity.Property(e => e.Did).HasColumnName("did");

                entity.Property(e => e.PatientId).HasColumnName("patient_id");

                entity.Property(e => e.Tname)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("tname");

                entity.Property(e => e.Treport)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("treport");

                entity.HasOne(d => d.DidNavigation)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("FK__test__did__403A8C7D");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK__test__patient_id__3F466844");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
