import { Card, Typography, Flex, Button } from "antd";
import Link from "next/link";

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

export default function Home() {
  return (
    <Flex justify="center" align="center" style={{height : "90vh"}}>
      <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
        <Flex justify="space-between">
          <img
            alt="avatar"
            src="https://i.pinimg.com/originals/fa/32/df/fa32df7b01a9960b45fcaac2c3c4c759.jpg"
            style={imgStyle}
          />
          <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
            <Typography>
              Hello World
            </Typography>
                <Link href="/users">Go</Link>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
