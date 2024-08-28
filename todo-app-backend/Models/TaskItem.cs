namespace TodoAppBackend.Models
{
    public class TaskItem
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
    }
}
