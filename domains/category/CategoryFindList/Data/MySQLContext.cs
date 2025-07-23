using CategoryFindList.Models;
using MySql.Data.MySqlClient;

namespace CategoryFindList.Data
{
    public class MySQLContext
    {
        private readonly string _connectionString;

        public MySQLContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Retrieve all categories
        public async Task<List<Category>> GetAllCategoriesAsync()
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

        // Retrieve a single category by ID
        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT * FROM categories WHERE idcategory = @id";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Category
                {
                    IdCategory = reader.GetInt32(reader.GetOrdinal("idcategory")),
                    NameCategory = reader.GetString(reader.GetOrdinal("namecategory")),
                    DescriptionCategory = reader.IsDBNull(reader.GetOrdinal("descriptioncategory"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("descriptioncategory")),
                    DateCreation = reader.GetDateTime(reader.GetOrdinal("datecreation")),
                };
            }

            return null;
        }
    }
}
