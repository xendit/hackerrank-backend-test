from locust import TaskSet, task

# https://docs.locust.io/en/latest/increase-performance.html#fasthttpsession-class
from locust.contrib.fasthttp import FastHttpLocust


class APIUserTasks(TaskSet):
    def on_start(self):
        self.client.get("/")

    def on_stop(self):
        self.client.get("/")

    # @seq_task(1)
    @task
    def api_count(self):
        count_response = self.client.get("/api/count")


class APIUser(FastHttpLocust):
    task_set = APIUserTasks
    min_wait = 5000
    max_wait = 15000
