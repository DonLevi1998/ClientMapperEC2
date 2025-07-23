using System.Data;
using MySql.Data.MySqlClient;

namespace CategoryCreate.Data
{
    public class MySQLContext
    {
        private readonly string _connectionString;

        public MySQLContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<int> CreateCategoryAsync(string name, string? description)
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query =
                @"INSERT INTO categories (namecategory, descriptioncategory) 
                          VALUES (@name, @description);";

            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@name", name);
            command.Parameters.AddWithValue("@description", description ?? (object)DBNull.Value);

            return await command.ExecuteNonQueryAsync();
        }
    }
}
