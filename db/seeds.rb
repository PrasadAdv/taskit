# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
Task.delete_all

# Create seed data
items = [
  { title: 'Item 1', status: 'To do', description: 'Description for item 1' },
  { title: 'Item 2', status: 'To do', description: 'Description for item 2' },
  { title: 'Item 3', status: 'In progress', description: 'Description for item 3' },
  { title: 'Item 4', status: 'In progress', description: 'Description for item 4' },
  { title: 'Item 5', status: 'Done', description: 'Description for item 5' }
]

items.each do |item|
  Task.create!(item)
end

puts "Seed data created successfully"
