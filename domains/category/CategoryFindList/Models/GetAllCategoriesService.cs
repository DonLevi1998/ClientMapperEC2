using CategoryFindList.Models;
using MySql.Data.MySqlClient;

namespace CategoryFindList.Models
{
    public class GetAllCategoriesService
    {
        private readonly string _connectionString;

        public GetAllCategoriesService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Fetch all categories from the database
        public async Task<List<Category>> ExecuteAsync()
        {
            var categories = new List<Category>();

            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT * FROM categories";
            using var command = new MySqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                categories.Add(
                    new Category
                    {
                        IdCategory = reader.GetInt32(reader.GetOrdinal("idcategory")),
                        NameCategory = reader.GetString(reader.GetOrdinal("namecategory")),
                        DescriptionCategory = reader.IsDBNull(reader.GetOrdinal("descriptioncategory"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("descriptioncategory")),
                        DateCreation = reader.GetDateTime(reader.GetOrdinal("datecreation")),
                    }
                );
            }

            return categories;
        }
    }
}
