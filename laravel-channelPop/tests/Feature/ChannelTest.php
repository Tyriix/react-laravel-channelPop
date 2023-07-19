<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Channel;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ChannelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test index method.
     */
    public function testIndex()
    {
        $channel1 = Channel::factory()->create();
        $channel2 = Channel::factory()->create();

        $response = $this->get(route('channels.index'));

        $response->assertStatus(200);
        $response->assertJson([
            [
                'id' => $channel1->id,
                'channelName' => $channel1->channelName,
                'population' => $channel1->population,
            ],
            [
                'id' => $channel2->id,
                'channelName' => $channel2->channelName,
                'population' => $channel2->population,
            ],
        ]);
    }

    /**
     * Test store method.
     */
    public function testStore()
    {
        $data = [
            'channelName' => 'New Channel',
            'population' => 1000,
        ];

        $response = $this->post(route('channels.store'), $data);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Channel has been created.',
        ]);

        $this->assertDatabaseHas('channels', $data);
    }

    /**
     * Test show method.
     */
    public function testShow()
    {
        $channel = Channel::factory()->create();

        $response = $this->get(route('channels.show', ['channel' => $channel->id]));

        $response->assertStatus(200);
        $response->assertJson([
            'channel' => [
                'id' => $channel->id,
                'channelName' => $channel->channelName,
                'population' => $channel->population,
            ],
        ]);
    }

    /**
     * Test update method.
     */
    public function testUpdate()
    {
        $channel = Channel::factory()->create();

        $data = [
            'channelName' => 'Updated Channel Name',
            'population' => 2000,
        ];

        $response = $this->put(route('channels.update', ['channel' => $channel->id]), $data);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Channel has been updated.',
        ]);

        $this->assertDatabaseHas('channels', $data);
    }

    /**
     * Test destroy method.
     */
    public function testDestroy()
    {
        $channel = Channel::factory()->create();

        $response = $this->delete(route('channels.destroy', ['channel' => $channel->id]));

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Channel has been deleted.',
        ]);

        $this->assertDatabaseMissing('channels', ['id' => $channel->id]);
    }
}
