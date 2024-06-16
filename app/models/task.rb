class Task < ApplicationRecord
  # Validates if title is present and of permitted length
  validates :title, presence: true, length: { in: 1..40 }
  validate :check_status_value

  private

  # Valid task status options
  STATUS_OPTIONS = ['To do', 'In progress', 'Done']

  # Validates if a task status choosen/supplied is from valid options
  def check_status_value
    return if STATUS_OPTIONS.include?(status)
    errors.add(:status, "Please choose appropriate value for status (To do, In progress, Done)")
  end

end
