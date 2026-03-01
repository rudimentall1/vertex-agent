# Vertex Agent for Swarm Challenge
# Vertex Agent for Swarm Challenge

## 🚀 Killer Pitch

Vertex Agent — полностью децентрализованная система координации роя роботов в условиях потери связи и отключения инфраструктуры.

Мы демонстрируем:

- Автоматическое peer-discovery
- Формирование роя без центрального сервера
- Распределение задач между ≥5 узлами
- Устойчивость к потере пакетов и разрывам соединения
- Передачу ролей при отказе узла

---

## 🧠 Architecture

Each agent runs a libp2p node, discovers peers automatically, exchanges state, participates in distributed task allocation, and reassigns responsibilities on node failure.

### Swarm Behavior Model

1. Discovery → Agents discover each other  
2. State Sync → Exchange capabilities and roles  
3. Task Allocation → Distributed decision-making  
4. Degradation Handling → Network partitions handled gracefully  
5. Role Transfer → If leader disappears, new one emerges  

### Network Fault Tolerance

- Packet loss  
- High latency  
- Partial network partitions  
- Node failure  

No central authority required.

---

## 🏆 Why This Solution Stands Out

- True peer-to-peer coordination  
- No centralized orchestration  
- Explicit handling of degraded network conditions  
- Clean modular architecture  
- Ready for integration with Gazebo/Webots  
- Production-ready Docker support
