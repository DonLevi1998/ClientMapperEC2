using CategoryUpdate.DTOs;
using MySql.Data.MySqlClient;

namespace CategoryUpdate.Data
{
    public class UpdateCategoryService
    {
        private readonly string _connectionString;

        public UpdateCategoryService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<bool> ExecuteAsync(CategoryUpdateDTO dto)
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query =
                @"
                UPDATE categories
                SET namecategory = @name, descriptioncategory = @description
                WHERE idcategory = @id";

            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@name", dto.NameCategory);
            command.Parameters.AddWithValue(
                "@description",
                dto.DescriptionCategory ?? (object)DBNull.Value
            );
            command.Parameters.AddWithValue("@id", dto.IdCategory);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }
    }
}
