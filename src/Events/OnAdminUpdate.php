<?php

namespace Admin\Resources\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OnAdminUpdate
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $command;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($command)
    {
        $this->command = $command;
    }

    public function getCommand()
    {
        return $this->command;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
