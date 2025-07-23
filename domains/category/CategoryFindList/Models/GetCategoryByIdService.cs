using MySql.Data.MySqlClient;

namespace CategoryFindList.Models
{
    public class GetCategoryByIdService
    {
        private readonly string _connectionString;

        public GetCategoryByIdService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Fetch a category by its ID
        public async Task<Category?> ExecuteAsync(int id)
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
