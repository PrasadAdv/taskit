class Task < ApplicationRecord
  validates :title, presence: true, length: { in: 1..40 }
  validate :check_status_value

  private

  STATUS_OPTIONS = ['To do', 'In progress', 'Done']

  def check_status_value
    return if STATUS_OPTIONS.include?(status)
    errors.add(:status, "Please choose appropriate value for status (To do, In progress, Done)")
  end

end
