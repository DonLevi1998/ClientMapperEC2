namespace CategoryUpdate.DTOs
{
    public class CategoryUpdateDTO
    {
        public int IdCategory { get; set; }
        public string NameCategory { get; set; } = string.Empty;
        public string? DescriptionCategory { get; set; }
    }
}
